In Winter 2025, I was a student in the University of Waterloo's notorious CS 452: Real-time programming. The course asks you to do two small things:

1. Write your own real-time kernel, given almost no starting code beyond a successful boot sequence.
2. Use your real-time kernel to develop a control system for a model train set.

This had to be done in no more than three months, in teams of only two.

![A nighttime photo of a street sign reading "no exit"`](/works/coding/cs452/no-exit.jpg)
[caption](Taken on the walk home after a long night in the trains lab)


## Real-time kernel

The kernel, arguably the easier ask of the course, is a multi-process kernel relying on message passing for inter-process communication. It interfaces with two I/O lines: one to the console, the other to the Märklin model train set; handling input in a timely manner required that the kernel also handle interrupts. 

A full feature list:

### Context switching

The kernel is able to run multiple processes in single-threaded parallel; that is, each system call pre-empts the process, allowing a new process to continue execution. Implementing this required writing assembly code to save registers as required by the Application Binary Interface (ABI) to the process stack, then loading the new task's registers before handing control back to the next process.

### Message passing

Through the implementation of system calls `Send()`, `Receive()`, and `Reply()`, we facilitated communication between processes. Sender processes could specify a target process to which to send an arbitrary bit string. When the receiving process called `Receive()`, it would be returned an incoming bit string, as well as the pid of the sender process. Finally, it could reply with another bit string, allowing for status indicators, API responses, and other valuable data.

Arbitrary bitstrings are challenging to identify the contents of. To handle this, we defined a pattern where the first 8 bits of any message were a code from 0-255, corresponding to a particular message type. Having identified the message type, the receiver process  could cast the bit string to that message type's request structure. We ultimately abstracted this away, allowing new processes to set up typesafe request parsing and handling with minimal opportunities to introduce new bugs.

![An image of the track server code, containing repeated calls to `server_register_branch`](/works/coding/cs452/server.png)
[caption](The main process for the track process: each possible subroutine is mapped to a message type, a message length, and a handler function)

### Interrupts

We handled two types of interrupts: clock tick interrupts and input interrupts. This required similar systems to the context switching logic; only with more registers saved, and more processor configuration to properly spawn the interrupts. 

Because of the speed of the processor relative to the lightweight nature of the tasks required of the operating system, the train control system could consistently run with a 90%+ idle time. What we discovered a month after writing the interrupt handling code is that this led almost every interrupt-driven context switch to occur while the processor was idle. No register state had to be restored, because it wasn't being used anyways.

This led to a particularly awful non-deterministic bug. Spontaneously, the program would crash, with no visible consistent cause. Trying to identify some root issue, we implemented a system of stack tracing - a functionality not natively found in our freestanding environment - where we made system calls throughout the program that would track the currently-executing function. 

Eventually, we found the bug: each time the interrupt handler fired while the processor was non-idle, we crashed.

![A crash log, where `AwaitEvent()` is the last process to execute pre-crash](/works/coding/cs452/interrupt-bug.jpg)
[caption](Discovered at around 3 AM, the night before a 9 AM deadline. We did not sleep that night.)

Valuable lessons were learned about testing your code.

### I/O

Handling input was a non-trivial task to begin with. Ingesting the various RX, TX, RT, and CTS interrupts already takes some 600 lines of code to implement, without any complications.

Of course, CS 452 can't be that simple, so there's another problem. The serial line connecting the Raspberry Pi's UART to the Märklin model train set is slow. Very slow. Because of this, sending commands to the Märklin involved a significant amount of custom handling. Consider that when the Pi sends a command to the Märklin, the Märklin must then lower its Clear To Send (CTS) signal to prevent the Pi from sending any more commands while it handles the current one. On a reasonably-fast serial line, this presents no issue. _However_, if the line is as slow as the one connecting to the Märklin sets, the lowered CTS signal can take so long to reach the Pi that the Pi sends another command to the Märklin during that time, which the Märklin summarily drops on the floor.

In effect, the CTS signal lies.

Take CS 452, and you, too, can understand why all of the memes plastered to the window of the trains lab are about the CTS signal.

## Train control

With the real-time kernel implemented, we then had to use it. The task was, at a very high level, simple: have multiple model trains navigate around the model train set without crashing into each other. 

Some problems:
* The only way to determine a train's location is by reading that it has passed over a sensor. All sensor reads are subject to variable amounts of time delay.
* When multiple trains are on the track, there is no reliable way to attribute a sensor to a given train. 
* To reliably be able to make decisions around train routing, and in particular, when to stop, you need accurate estimates of the train's location. This required knowing the train's m/s speed at each configurable train speed level, which existed on a non-linear scale of settings 0-14. The real-world m/s speed changed day-by-day based on accumulated grease, dust, and damage to the track.
* Trains break. Tracks break. Often, the blocker to development was that someone else had the train you had measurements for.
* Between 30 students, there were two tracks and five trains.

To top it all off, on the last night of the course, one of the trains, inexplicably, somehow, jumped off the tracks and table and smashed onto the floor.

Two leading schools of thought emerged among the students of the course: monolithic train control and multi-process train control. We opted for multi-process, where we split all functionality among many small processes. In the end, our total process count was over 70. In large part, this was caused by our decision to avoid almost all inter-process deadlock scenarios by simply making every process a server; that is, no meaningful process could ever be blocked on the execution of another process. To facilitate this, each server process spawned an associated courier task, which passed messages between the various servers.

## Conclusions

[This course was hell](https://mathnews.uwaterloo.ca/wp-content/uploads/2025/03/mathNEWS-157-5.pdf#page=8). It was also some of the best type 2 fun I've had in a while. It's like a mountain; there's very little fun about climbing it, but once you look back on it, you're proud of yourself for doing it.

It's also a trap. Entirely. This course is a trap for students who feel the need to climb the highest mountains. Every reasonable computer science student at UW will warn you not to take CS 452, and if you take it anyway, it's because you need to learn a valuable lesson about mountain climbing: sometimes, you don't need to do it.

At the beginning of the course, I reprioritized around this course, to attempt to do as best as I could at all possible times, sacrificing farmer's market trips, fun excursions, movie nights, and more, to the unquenchable beast that is the Märklin model train set.

By around the halfway point, however, I realized the true lesson it's trying to teach: _don't do that_. This is how, after the final kernel deadline, on three hours of sleep over the past thirty-six hours, I found myself in a dark, fog-filled, laser-lit London, Ontario arena, shouting at the top of my lungs, sharing with thousands of others a nearly-religious experience.

![A crash log, where `AwaitEvent()` is the last process to execute pre-crash](/works/coding/cs452/mother-mother.jpg)

Live to the fullest.
