const inviteFriend = async invite => {
  try {
    const response = await fetch(
      "https://us-central1-codenames-3a350.cloudfunctions.net/sendInvite",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(invite)
      }
    );
    return await response.json();
  } catch (error) {
    return error;
  }
};

export default inviteFriend;
