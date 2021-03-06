## MLH Fellowship Introduction Hackathon
### `sq-owls-team-1`

# ShOWLopping list:blue_book:

> ShOWLopping list is a digital shopping list app which enables consumers to collaborate in real-time on shared shopping lists

# Introduction :open_book:

Shopping has been and always will be the part of our daily routine. Sometimes we have time for it, sometimes we do not. For the times we don't, we would like to make this process as fast and smooth and possible. In order to optimize our routine, we need to write down all the items we would like to buy in advance. This way we don't have to think about it in the shop, because in this case you will definitely spend more time and money for it. We can use some phone "Notes" for it, but what happens in case someone (e.g your family member ) asks you to buy something extra? In this case you will have to open your notes and add something. What if your are driving and cannot use your phone? Then you may forget something. Our team comes with the solution right for you! Shopping list Web and Android application, where users can use common lists. Now, the family member will only have to add the item in your common list and you do not need to bother yourself with extra actions. Isn't it super convinient?

# User stories :frowning_man:

- [ ] As a user I would like to secure my data and able to access application only via username/phone number and password
- [ ] As a user I would like to see the lists I am the member of
- [ ] As a user I would like to see the items of the list I have chosen
- [ ] As a user, I would like to have real-time syncing of my shopping list, so in case another member of the list added an item in last minute I know about it
- [ ] As a user I would like to create lists myself


# Architecture description ⚙️
### Log in :desktop_computer:

 The `Amazon Cognito` was used to implement authentication, for authorization `Amazon AppSync. All the users and their encrypted passwords are stored in the  database.


### Design :rice_scene:

Firstly we have created the sketch of our design for mobile view and extended it to the web app after. The goal was to try to keep mobile app and web app designs consistent. We inspired from different design ideas and came up with the sketch.

![CROPPED](https://user-images.githubusercontent.com/57729718/134720778-97386586-8938-4146-ac1a-00a71b842e92.png)




### Backend Communication :email:

`AWS Amplify`  is a set of tools and services that can be used together or on their own, to help front-end web and mobile developers build scalable full stack applications, powered by AWS. It is available for a lot of platforms, including React and Android. `Amazon DynamoDB` is a database behind the `AppSync` and GraphQL was used as a query language for communication.

### Architecture
![Untitled_Diagram drawio_1](https://user-images.githubusercontent.com/57729718/134559332-bb81b704-a3ea-48e5-8091-a184d878864f.png).

### Client platforms
We have decided to make app avaialable to more users, so we started the implementation of 2 versions: WebApp React and Mobile App for Android. React application is working properly, however, Android is missing the fetching and posting data to the backend functionality (even though authorization and authentication features are working fine).

### Data
In the DB we store the following data (tables):
- Items
- ShoppingLists
- Memberships
- Users


# Further development :stars:
- [ ] Maintain the Android Client backend communication
- [ ] Improving the UI and adding beautiful animations :smile:

# Setup and installation
1. Install the amplify CLI: npm install -g @aws-amplify/cli
2. Configure your AWS account with the cli by running amplify configure
3. Run amplify init in the react-web folder
4. Run amplify push


# DEMO









