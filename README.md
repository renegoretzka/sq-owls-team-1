## MLH Fellowship Introduction Hackathon
### `sq-owls-team-1`

# Shopping List App

# Introduction :open_book:

Shopping was and will always be the part of our daily routine. Sometimes we have time for it, sometimes we do not, and especially in the second case we would like to make this process as fast and smooth and possible. For this we need to write down all the items we would like to buy in advance, not to think about it in the shop, because in this case you will definitely spend more time and money for it. We can use some phone "Notes" for it, but what happens in case someone (e.g your family member ) asks you to buy something extra? In this case you will have to open your notes and add something. What if your are driving and cannot use your phone? Then you may forget something. Our team comes with the solution right for you! Shopping list Web and Android application, where users can use common lists. Now, the family member will only have to add the item in your common list and you do not need to bother yourself with extra actions. Isn't it super convinient?

# User stories :frowning_man:

- [ ] As a user I would like to secure my data and able to access application only via username/phone number and password
- [ ] As a user I would like to see the lists I am the member of
- [ ] As a user I would like to see the items of the list I have chosen
- [ ] As a user, I would like to have real-time syncing of my shopping list, so in case another member of the list added an item in last minute I know about it
- [ ] As a user i would like to create lists myself


# Architecture description ⚙️
### Log in :desktop_computer:

 The `Amazon Cognito` was used to implement authentication, for authorization `Amazon AppSync. All the users and their encrypted passwords are stored in the  database


### Design :rice_scene:

Firstly we have created the sketch of our design for mobile view and extended it to the web app after. The goal was to try to keep mobile app and web app designs consistent. We inspired from different design ideas and came up with the sketch


<img width="1387" alt="Screen Shot 2021-09-24 at 12 35 22" src="https://user-images.githubusercontent.com/57729718/134661200-7a50fc78-4c1e-48ea-a1bc-e315c722a004.png">


### Backend Communication :email:

`AWS Amplify`  is a set of tools and services that can be used together or on their own, to help front-end web and mobile developers build scalable full stack applications, powered by AWS. It is available for a lot of platforms, including React and Android. Amazon DynamoDB is a database behind the webserver and GraphQL was used as a query language for communication

### Architecture
![Untitled_Diagram drawio_1](https://user-images.githubusercontent.com/57729718/134559332-bb81b704-a3ea-48e5-8091-a184d878864f.png)
### Data
In the DB we store the following data (tables):
- Items
- ShoppingLists
- Memberships
- Users







