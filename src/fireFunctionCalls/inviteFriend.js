const inviteFriend = async invite => {
  const response = await fetch(
    "http://localhost:5001/codenames-3a350/us-central1/sendInvite",
    {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(invite)
    }
  );
  return await response.json();
};

export default inviteFriend;
