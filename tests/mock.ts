const mockData: {
  user: any[],
  profiles: any[],
  notifications: any[],
  profileNotifications: any[],
} = {
  user: [
    {
      id: 1,
      name: "Traian",
      email: "traian@mail.com"
    },
    {
      id: 2,
      name: "Fran",
      email: "fran@mail.com"
    },
    {
      id: 3,
      name: "Pepe",
      email: "pepe@mail.com"
    }
  ],
  profiles: [
    {
      id: 1,
      userId: 1,
      name: "Traian"
    },
    {
      id: 2,
      userId: 2,
      name: "Fran"
    },
    {
      id: 3,
      userId: 3,
      name: "Pepe"
    }
  ],
  notifications: [
    {
      id: 1,
      name: "NewMovie_Deadpool",
      message: "Deadpool is now in Netflix"
    },
    {
      id: 2,
      name: "NewMovie_Batman",
      message: "Batman is now in Netflix"
    },
    {
      id: 3,
      name: "NewEpisodes_BreakingBad",
      message: "There are new episodes of breaking bad"
    },
    {
      id: 4,
      name: "NewDocumental_BreakingBad",
      message: "There are new episodes of breaking bad"
    }
  ],
  profileNotifications: [
    {
      id: 1,
      userId: 1,
      notificationId: 1,
      ack: "false"
    },
    {
      id: 2,
      userId: 2,
      notificationId: 1,
      ack: "false"
    },
    {
      id: 3,
      userId: 3,
      notificationId: 3,
      ack: "false"
    },
    {
      id: 4,
      userId: 2,
      notificationId: 2,
      ack: "false"
    },
    {
      id: 5,
      userId: 1,
      notificationId: 1,
      ack: "true"
    },
    {
      id: 6,
      userId: 1,
      notificationId: 4,
      ack: "true"
    }
  ]
};

export { mockData }; // named export
export default mockData; // default export 