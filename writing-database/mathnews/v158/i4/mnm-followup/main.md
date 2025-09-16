On June 11th, 2025, the Information and Privacy Commissioner of Ontario released a report finding that 2024’s on-campus M&M vending machines’ use of facial detection software breached students’ privacy rights. 

It finds that the University of Waterloo did collect personal information in violation of Ontario privacy law, and finds shortcomings in their procurement processes that allowed this to happen. In response, they recommend the university be more careful next time.

I don’t know if that’s enough.

## BACKGROUND: M&M machines’ brief time on campus cut short by student reaction to self-declared facial recognition

The report concerns the events of the Winter 2024 term, where bright yellow M&M-selling intelligent vending machines (IVMs) were deployed across campus[1]. A few weeks later, Redditor u/SquidKid47 encountered one displaying the following error:

> `Invenda.Vending.FacialRecognitionApp.Exe — Application Error`

Students’ efforts against them quickly escalated from Reddit complaints, to stickering over the cameras, to a mathNEWS article comparing the machines’ actions to past Canadian privacy cases[2], to gaining the attention of local and international media[3]. Around this time, mathNEWS writers filed complaints with the federal and provincial privacy commissioners. 

Soon after, the university removed the machines from campus.

In December, MARS’s resolution to stop the machines’ rollout in Canada resolved the federal complaint[4]. This recent development concerns the provincial report, which sought to answer the following three questions:

1. Can the use of face detection technology be considered collection of personal information?
2. Was collection of personal information done in compliance with Ontario privacy law?
3. Did the university have reasonable measures in place to protect personal information?

## ITEM ONE: Facial detection found to constitute collection of personal information

As recording the demographic data of passers-by was an explicit selling point of the Invenda machines[5§30], Investigator John Gayle sought to identify whether doing so legally constitutes recording of personal information under Ontario law.

Per Gayle’s investigation, the M&M machines ran facial detection software to detect passers-by[5§37]. Upon detecting a face nearby, the machine would take a picture, strip all personal data, and reduce it to a feature map from which only your age, gender, mood, behaviour, and qualities of having facial hair or glasses could be identified[5§42]. Of this data, only age and gender data ultimately reached the machines’ manufacturer, Invenda[5§47].

![image](/works/writing/mathnews/feature-algo.png)
[caption](the machines’ feature detection algorithm[5§43])

The university argued this does not constitute personal information collection. They claimed that the machines’ “optical sensor” was too low-res to be considered a camera[5§31]; its 480p resolution—the output resolution of a Playstation 2—could not produce identifiable images[5§59]. 
To this, Gayle rebukes

> I note that the university did not provide any evidence to support its position.

Gayle concluded that if an algorithm strips away personal information, that implies it was initially recorded. Hence, it meets the definition of collection of personal information [5§82].

## ITEM TWO: Data collection found to be non-compliant with Ontario law

Per Ontario law, “No person shall collect personal information on behalf of an institution unless the collection is expressly authorized by statute, used for the purposes of law enforcement or necessary to the proper administration of a lawfully authorized activity.”[6]. As the first two conditions did not apply, Gayle sought to determine whether collection of personal data was “necessary to the proper administration” of snack sales. He states

> I have been provided with no evidence or argument by the university, nor am I aware of any facts or circumstances, by which the collection of facial images by the IVMs for conversion to demographic data is necessary for operation of the machines or the completion on [sic] individual transactions.

Ontario law further requires that users be informed when their data is to be collected. Gayle found this also not to have occurred.

Hence, not only did the university’s contractors collect our data, they did so needlessly, and without the informed consent required.

We were right. :)

## ITEM THREE: IPC finds university procurement to require further safeguards around “intelligent” partnerships

Last, Gayle considered whether the university has “reasonable measures in place to protect personal information” in accordance with Ontario law. The University of Waterloo has an information risk assessment process in place, enabling them to investigate whether new contracts involve biometrics or surveillance capabilities[5§115]. 

The university chose not to perform such an assessment[5§117]. They saw no need; the machines’ operator gave them no reason. The operator disclosed working with MARS to test new, “intelligent” machines, but that was the full extent of their disclosure[5§136]. 

Notably, the developers of the facial detection software recommend that users be informed of its use[5§94]. Somewhere in the supply chain to the university, a contracting party forgot to pass along this vital information. 

## Is that sufficient?

Ultimately, the report recommends the university review its privacy policies and be more careful when the word “intelligent” appears in a contract. That’s all.

It’s a win; Ontarian privacy advocates now have this decision to point to in future battles.

Simultaneously? The report has no teeth. 

How is it that the university, equally blindsided as the students were, is the only party held accountable? 

Why are there no consequences to other companies involved for failing to properly disclose the cameras’ use to the university?

Why is the vending machines’ operator, who reasonably should have the duty of care to be aware of the technology in the machines they operate, free of consequences for failing to do so?

Some of this is due to the nature of the privacy complaint, having been made against the university. I find this uses present systemic failings as a bar to change. 

We’re a school of engineers. Anyone with an engineering background can tell you that all failure is systemic failure; all systemic failure is a driver for systemic change. We need privacy regulators to be able to take meaningful action when presented with breaches. All of this clear evidence of wrongdoing, and all they were empowered to do was recommend the university alone try harder?

We have a privacy commissioner for a reason. We need a system that lets them act.

Until then? mathNEWS makes do.

--postscript--

1. The sexy M&M bandit strikes, mathNEWS 154.2
2. The M&M machines are watching you, mathNEWS 154.3
3. Cecco, Leyland. “Canadian university vending machine error reveals use of facial recognition.” The Guardian, 23 February 2024, https://www.theguardian.com/world/2024/feb/23/vending-machine-facial-recognition-canada-univeristy-waterloo, among others
4. MARS Canada to halt video analytics vending machines’ rollout after mathNEWS reporting, mathNEWS 157.1
5. University of Waterloo (Re), 2025 CanLII 54835 (ON IPC), <(https://canlii.ca/t/kclqn)[https://canlii.ca/t/kclqn]>, retrieved on 2025-06-21

   I beg the Canadian media to cite their sources. It took several days to find a publicly-accessible source for this.
6. R.S.O. 1990, c. F.31, s. 38 (2)
