<p align="center">
<img id="header-logo" src="/_resources/35c158d4790b477ea20d375a69aa9998.png"/>
</p>
---

**An online multiplayer adaptation of the classic hit board game Codenames. Allows 4+ players to participate in a game of deduction as two teams race to decode the clues given to them by their spymaster.**
<br/>

**A Brief Description:**
Built with Google Firebase and React to create real-time connectivity across multiple users and to be able to sync up various decks, boards, and roles. One of the interesting things about the project was building the game logic, as we had to take into consideration what data we need available to manipulate and how it would interact with each user’s unique set of data. We learned how to better tackle the code from a scalability POV as reads and writes to the database can quickly pile up, especially when dealing with multiple users during one game session.
<br />

**Adaptation designed and built by:** [Sunil Abraham](https://github.com/iamnotsunil), [Stanislav Levitt](https://github.com/stanislavlevitt), [AAron Staton](https://github.com/Astaton)

**Try it out here:** [Codenames](https://codenames-3a350.firebaseapp.com)

<br />

## Tech Stack

---

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Firebase](https://firebase.google.com/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore](https://firebase.google.com/docs/firestore)
- [Node](https://nodejs.org/en/)
- [Nodemailer](https://nodemailer.com/about/)

<br />

## Features

---

- Local login and authentication
- Google authentication
- Persistent real time chat
- Create new game rooms or join existing game rooms
- Syncronized interactive game boards
- Email game invitations to friends
- Constantly updated user win-loss records
- Multiplayer 4+
- Customized game endings

<br/>

## App Walkthrough

---

**Sign Up**

![signUp.gif](/_resources/6305f0ba7c8644e08e383ffcc1ba0878.gif)
<br/>

**Start a new game and invite friends**

![new game and invites.gif](/_resources/ca37e06b59c74edbbb6ae8612306ad76.gif)
<br />

**Game play for Spy and Spy Master boards**

![gamePlay.gif](/_resources/06dae5623afa4db1907071c037e737f9.gif)
<br />

**Customized Game Endings with Replay Options**

![endGameScreens.gif](/_resources/cdb6d05660734b68b0f57c9f792966b7.gif)

<br />

**User Records**
![UserRecord.png](/_resources/b75eb7bca83e407b878150cb96bfe616.png)

<br />

## Local Setup

---

**From the terminal run:**

<pre>
git clone https://github.com/Capstone-team-10/Codenames 
cd Codenames 
npm install 
npm start
</pre>

**After npm start**<br />
The App will start running in development mode.<br />
Open [http://localhost:3000](http://localhost:3000)<br />
The page will reload if you make edits.
