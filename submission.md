# Instructions

For Digital Solution:

- Short Pitch (max 3 sentences)
- Problem Description
- Solution Description
- Action Plan
- Demo Video (max 2 min)
- Tech Description
- Github repo (if you have one)
- Team Description
- Team Contact Info


http://www.hackthecrisis.se/submission

# Short pitch
The usual way of managing queues to a store/facility are not optimal when seen from the perspective of minimizing spread of the SARS-CoV-2 virus.

We propose a fully digital solution which takes minutes to setup and is not dependant on complex registration processes, specialized hardware or the sharing of personal data.

Our solution helps save lives by making physical distancing easier and minimizing the time exposed to other people for situations where queueing are a necessity.  

# Problem description
In order to slow the spread of the SARS-CoV-2 virus physical distancing rules are now suggested, mandatory and even enforced in many places. What can we do to minimize the physical contact and therefore help saving lives in situations where physical queues and waiting in line previously was the norm?


# Solution description
We propose a fully digital solution which is not dependant on complex registration processes, exotic hardware or the sharing of personal data. It aims to replace the "old" way of getting a paper ticket and collectively waiting in the vincinity where the current/next ticket being processed are called out. 

A store representative:
1. Registers the site/facility by supplying:
 - A description together with an optional logo, for ex. "Systembolaget"
2. Gets automatically assigned a unique site-identifier in the form of a QR-code.
- This is what identifies the site and should be kept "secret". If it is lost or compromised the site can always redo the registration (not a big deal since it's so easy anyway).
3. Registers one or more virtual queues within the site by supplying:
- A description for the queue, for ex. "Huvudkön"
4. Gets back a unique identifier in the form of a QR code for each queue.
- The QR code is what the customers scan in order to enter the queue and get a virtual ticket.
5. Watches realtime information about the queue and manages it:
- Calculated total estimated waiting time for the queue.
- Number of people currently in the queue.
- The current ticket number being handled.
- Function to advance the queue.

A customer arrives at a site for which he/she wan't to be admitted:
1. Uses their phone to scan the QR code which the site representatives have made available in some way.
2. Enters the queue and gets assigned a virtual ticket.
3. The virtual tickett displays estimated time left before admission, and the customer can therefore choose to wait somewhere else in order to minimize contact with others.
4. When the estimated queue time gets closer to zero, the customer moves towards the admission point.
5. Waits in the vincinity until his/her own ticket number comes up on a screen or is called out in some way.
6. Shows the virtual ticket to the admission representative and gets admitted.
- When admitting a person the admission representative advances the queue through their administrative interface.

The above process can be made without requiring close contact between people or having them touch shared surfaces.

We have during the background research found some other systems addressing queue management.
But all of them exhibit one or more of the following:
- Not free.
- Not open source.
- Requires extensive/complex registration processes for the store/facility in question.
- Requires customers to share personal data (email, phone number, ...).
- Not easy to setup or use.



# Action plan
The MVP developed is albeit basic, fully functional, and can be used on a small scale relatively fast.

In order to support widespread usage, the key areas in need of improvement are:
- Replace in memory storage with persistent database storage.  
- UX/UI work.  
- Improved calculations for estimated time left.  
- Hosting in some cloud service for easier scaling.  

During development we have come up with many ideas on how to extend the system and add more functionality, but for now we feel that focusing on the core problem and solving that in a good way with minimal amount of work is the way forward.





# Tech description
Developed as a web applikation using modern technologies: 
- Node.js
- Angular



# Github repo
https://github.com/Lavan/queue-system

# Team description

# Team contact info
Per Bernhardson
Fredrik Mäkeläinen
Mattias Flodin