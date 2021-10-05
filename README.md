# Society-Management-WebApp

- A society personal website where we can manage all information about society.

- we can manage complaines, events, contacts, Advertise, management people, admin etc...

- We can manage members details like his contacts,photos,proffession,family members and his Advertises.

## About project

- For this project society name as [digital-society.](https://digital-society.herokuapp.com)

- In future any residency will buy this website then digital society name will be replaced by society name.

- Feel free to explore this project and any dout contact me on [yagnesh6202patel@gmail.com](mailto:yagnesh6202patel@gmail.com).

- It has a custom **Admin panel** and it's Fully **Responsive** with All type of devices.

## Credentials For Demo Purpose

**Register Member :**

- society_code : 123UI

**Admin Login :**

- Email : admin@gmail.com
- Password : 123

## Demo

[**🔗 Digital-society**](https://digital-society.herokuapp.com)

![](https://res.cloudinary.com/digitalsocietystorage/image/upload/v1632999968/ezgif.com-gif-maker_cx2bfb.gif)

## Run Locally

#### Clone the project

```bash
  git clone https://github.com/yagneshpatel12/society-management-webapp.git
```

#### Go to the project directory

```bash
  cd society-management-webapp
```

#### Add Environment Variables

To run this project, you will need to add the following environment variables to your .env file
![envVairalbles](https://res.cloudinary.com/digitalsocietystorage/image/upload/v1633360088/Screenshot_347_vxrckj.png)

| variable                     | Description                               |
| :--------------------------- | :---------------------------------------- |
| **HASH_SECRET**              | More than 10 character string             |
| **JWT_ACCESS_TOKEN_SECRET**  | More than 10 character string             |
| **JWT_REFRESH_TOKEN_SECRET** | More than 10 character string             |
| **MONGO_URL**                | Mongodb database url                      |
| **GMAIL_APP_USERNAME**       | your SMTP username                        |
| **GMAIL_APP_PASSWORD**       | your SMTP App password                    |
| **CLOUDINARY_NAME**          | Your cloudinary storage name              |
| **CLOUDINARY_API_KEY**       | Get API_KEY in your cloudinary account    |
| **CLOUDINARY_API_SECRET**    | Get API_SECRET in your cloudinary account |

### Server side setup

Installing dependencies

```bash
  npm install
```

Start the server

```bash
npm start
```

### Client side setup

open new terminal and go to client directory

```bash
  cd client
```

Installing dependencies

```bash
  npm install
```

Add proxy in package.json (client side)

```bash
"proxy":"http://localhost:5501"
```

Run locally client

```bash
npm start
```

### Create Admin

**❗ important**

- First time you go to `http:localhost:3000/registeradmin` and Register Admin.

- Then Go to setting and set the society code.

- Then you logout to Admin panel and registers users.

## Technologies

**Client :** `React js` `contextApi`

**Server :** `Node js` `Express` `Rest Api`

**Libraries used in client and server side :** `Axios` `Swiperjs` `Aos` `Animejs` `Mongoose` `Jwt` `Nodemailer`

**Database :** `Mongodb`

**Img Storing :** `cloudinary`

**Hosting :** `heroku`

## Features

**Guest user** :-

- Visit Member profile
- Explore Advertises
- Society photos
- Show events
- contact us

**Login user** :-

- Create profile
- Add family members
- Advertise their business by creating advertise post
- Complaine to society
- Edit profile
- All guest features available

**Auth** :-

- Register Member
- verifying by OTP (send to gmail) and society code
- Change their password to clicking forgot password
- Multiple device login

**Admin** :-

- Events (show,add,create,delete)
- Management People (show,add,create,delete)
- Members (show,delete)
- Advertise (show,delete)
- Complaine (show,delete)
- Contact (show,delete)
- Change society code , AdminInfo

## Contributing

Contributions are always welcome!

## Feedback

If you have any feedback, please reach out to us at yagnesh6202patel@gmail.com.

## Few Project Photos

| Register screen 1                                                                                                                      | Register screen2                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| ![](https://res.cloudinary.com/digitalsocietystorage/image/upload/v1633017532/digital-society.herokuapp.com__screenshots_5_fnhook.png) | ![](https://res.cloudinary.com/digitalsocietystorage/image/upload/v1633017521/digital-society.herokuapp.com__screenshots_6_nozfyx.png) |

#### Profile

![](https://res.cloudinary.com/digitalsocietystorage/image/upload/c_scale,h_600/v1633017237/digital-society.herokuapp.com_allmembers_a7c8827f71_aptemq.png)

#### Admin panel

| 1                                                                                                                                      | 2                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| ![](https://res.cloudinary.com/digitalsocietystorage/image/upload/v1633015340/Screenshot_315_trwwse.png)                               | ![](https://res.cloudinary.com/digitalsocietystorage/image/upload/v1633015352/Screenshot_316_adycoq.png)                               |
| ![](https://res.cloudinary.com/digitalsocietystorage/image/upload/v1633016868/digital-society.herokuapp.com__screenshots_4_ubpb0r.png) | ![](https://res.cloudinary.com/digitalsocietystorage/image/upload/v1633016878/digital-society.herokuapp.com__screenshots_2_vcuk1h.png) |

#### Fully Responsive

| Home                                                                                                                                                              | Navbar                                                                                                                                                  | Profile                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![](https://res.cloudinary.com/digitalsocietystorage/image/upload/c_scale,h_500/v1633062259/digital-society.herokuapp.com_gallery_iPhone_6_7_8_Plus_1_zyyj28.png) | ![](https://res.cloudinary.com/digitalsocietystorage/image/upload/c_scale,h_500/v1633062408/digital-society.herokuapp.com_advertise_Moto_G4_l7njbn.png) | ![](https://res.cloudinary.com/digitalsocietystorage/image/upload/c_scale,h_500/v1633062655/digital-society.herokuapp.com_advertise_iPhone_6_7_8_Plus_cuwxei.png) |
