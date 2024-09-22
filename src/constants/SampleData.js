export const Samplechats = [
    {
      avatar: ["https://randomuser.me/api/portraits/men/1.jpg"],
      name: "Alice Johnson",
      _id: "101",
      groupChat: false,
      members: ["101", "102"],
    },
    {
      avatar: ["https://randomuser.me/api/portraits/women/2.jpg"],
      name: "Bob Smith",
      _id: "102",
      groupChat: true,
      members: ["101", "102", "103"],
    },
    
  ];
  

export const SampleUsers=[
    {
        name:"John Doe",
        _id:"1",
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
    },
    {
        name:"Rustam Dubey",
        _id:"2",
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
    },
]


export const SampleNotifications=[
    {
        sender:{
            name:"John Doe",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        
        },
        _id:"1",
        
    },
    {
        sender:{
            name:"Rustam Dubey",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        },
        _id:"2",
    },
]


export const sampleMessage=[
    {
        attachments:[
            // {
            //     public_id:"asadasda",
            //     url:"https://www.w3schools.com/howto/img_avatar.png",
            // },
        ],
        content:"Hello i am testing this",
        _id:"ojsdoasjjdo",
        sender:{
            _id:"user._id",
            name:"rohan",
        },
        chat:"chatId",
        createdAt:"2021-11-11T11:11:11.111Z",
    },
    {
        attachments:[
            {
                public_id:"dsjads",
                url:"https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content:"",
        _id:"dasadasd",
        sender:{
            _id:"afsf",
            name:"roanie",
        },
        chat:"chatId",
        createdAt:"2021-11-11T11:11:11.111Z",
    }
]


export const dashboardData={
    users:[
        {
            name:"John Doe",
            _id:"1",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            username:"john_doe",
            friends:20,
            groups: 5
        },
        {
            name:"Rustam Dubey",
            _id:"2",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            username:"rustam_dubey",
            friends:15,
            groups: 3
        },
    ],
    chats:[
        {
            name:"New Ruckers",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"1",
            groupChat:false,
            members:[
                {id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
                {id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
                {id:"3",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
            ],
            totalMembers:3,
            totalMessages:20,
            creator:{
                name:"John Doe",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }
            
        },
        {
            name:"Gym Gods",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"2",
            groupChat:false,
            members:[
                {id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
                {id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
            ],
            totalMembers:2,
            totalMessages:20,
            creator:{
                name:"John Doe",
                avatar:"https://www.w3schools.com/howto/img_avatar.png"
            }

        }
    ],
    messages:[
        {
            attachments:[],
            content:"Hello i am testing this",
            _id:"ojsdoasjjdo",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"rohan",
                
            },
            chat:"chatId",
            groupChat:false,
            createdAt:"2024-02-12T10:41:30.630Z"
        },
        {
            attachments:[
                {
                    public_id:"dsjads",
                    url:"https://www.w3schools.com/howto/img_avatar.png",
                },
            ],
            content:"",
            _id:"dasadasd",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"roanie",
                
            },
            chat:"chatId",
            groupChat:true,
            createdAt:"2024-02-12T10:41:30.630Z",
        }
    ]
}