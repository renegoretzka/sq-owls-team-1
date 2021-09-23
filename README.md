## MLH Fellowship Introduction Hackathon
### `sq-owls-team-1`

# Shopping List App

# Introduction :open_book:
Shopping was and will always be the part of our daily routine. Sometimes we have time for it, sometimes we do not, and especially in the second case we would like to make this process as fast and smooth and possible. For this we need to write down all the items we would like to buy in advance, not to think about it in the shop, because in this case you will definitely spend more time and money for it. We can use some phone "Notes" for it, but what happens in case someone (e.g your family member ) asks you to buy something extra? In this case you will have to open your notes and add something. What if your are driving and cannot use your phone? Then you may forget something. Our team comes with the solution right for you! Shopping list Web and Android application, where users can use common lists. Now, the family member will only have to add the item in your common list and you do not need to bother yourself with extra actions. Isn't it super convinient?

# User stories :frowning_man:
- [ ] User is able to access application via the phone number registration
- [ ] After the phone number is successfully verified, user is able to access his profile
- [ ] On the page user is able to see the lists he is the member of
- [ ] By clicking on the list name the items there are revealved
- [ ] In case user adds item to the list anyone subscribed to this list will immediately see anything the user added
- [ ] User can create lists himself


# Architecture description ⚙️
### Log in 

 The `Amazon Cognito` was used to implement authentication and authorization. All the users and their encrypted passwords are stored in the  database


### Design

Firstly we have created the sketch of our design for mobile view and extended it to the web app after. The goal was to try to keep mobile app and web app designs consistent. 

### Backend Communication
`AWS Amplify`  is a set of tools and services that can be used together or on their own, to help front-end web and mobile developers build scalable full stack applications, powered by AWS. It is available for a lot of platforms, including React and Android. Amazon DynamoDB is a database behind the webserver and GraphQL was used as a query language for communication

### Architecture
![Screen Shot 2021-09-08 at 10 08 00](https://user-images.githubusercontent.com/57729718/134558227-50c43c19-356d-4261-80d9-25d554c831d2.png)

