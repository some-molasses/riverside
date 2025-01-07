## What is it?

This program models the spread of an infectious disease in a local community (e.g. workplace, neighbourhood).

## Is it accurate?

Maybe! The bouncing of dots is probably not a perfect model of how infectious diseases spread, but it does provide an interesting visual nonetheless.

## Can I change it?

Yes! Under the "controls" tab, one can alter the _infection details_ and _anti-infection measures_ in place against the infection. When you press _restart simulation_, the model will use your new parameters.

## There is a single green dot bouncing around my screen

Whoops! It appears that the person who brought the virus into this community didn't interact with anyone; hence, did not spread the virus.

Press _restart simulation_ in the controls tab to try again.

## The chart scrollbar is stuck

This is intentional, in order to show the most up-to-date data onscreen. To allow scrolling, check _unlock chart_ under _shown statistics_.

## What external code libraries were used to make this?

Originally? None! HTML canvas and the built-in Math library can be surprisingly powerful tools.

I later added TypeScript in 2021, and then moved the original HTML to React in early 2025. The core code is still untouched though.
