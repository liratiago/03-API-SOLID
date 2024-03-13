# App

Gympass style app.

## RFs (Requisitos funcionais)

- [ x ] It should be possible make registration
- [ x ] It should be possible authentication
- [ ] It should be possible get a user info
- [ ] It should be possible get ckeckin's quantity
- [ ] It should be possible get user checkin's history
- [ ] It should be possible search near gyms
- [ ] It should be possible search gym by name
- [ ] It should be possible a user do checkin into a gym
- [ ] It should be possible validate a user's checkin 
- [ ] It should be possible to register a gym

## RNs (Regras de negócio)

- [ x ] User cannot be registered with a invalid email
- [ ] User cannot do 2 checkins in the same day
- [ ] User cannot do checkin if he stay more than 100m far away gym
- [ ] The checkin can be validated up to 20m after being created
- [ ] The checkin can only be validated by administrators 
- [ ] The gym can only be register by administrators 


## RNFs (Requisitos não funcionais)

- [ x ] User's password should be encriypted
- [ x ] Aplication data should be stored in PostgreSQL
- [ ] The data lists should be paginated with 20 itens by page
- [ ] The user should be identificated by a JWT (Json Web Token)