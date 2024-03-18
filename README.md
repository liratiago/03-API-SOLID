# App
commit
Gympass style app.

## RFs (Requisitos funcionais)

- [ x ] It should be possible make registration
- [ x ] It should be possible authentication
- [ x ] It should be possible get a user info
- [ x ] It should be possible get ckeckin's quantity
- [ x ] It should be possible get user checkin's history
- [ x ] It should be possible search near gyms ( until 10km )
- [ x ] It should be possible search gym by title
- [ x ] It should be possible a user do checkin into a gym
- [ X ] It should be possible validate a user's checkin 
- [ x ] It should be possible to register a gym

## RNs (Regras de negócio)

- [ x ] User cannot be registered with a invalid email
- [ x ] User cannot do 2 checkins in the same day
- [ x ] User cannot do checkin if he stay more than 100m far away gym
- [ x ] The checkin can be validated up to 20m after being created
- [ ] The checkin can only be validated by administrators 
- [ ] The gym can only be register by administrators 


## RNFs (Requisitos não funcionais)

- [ x ] User's password should be encriypted
- [ x ] Aplication data should be stored in PostgreSQL
- [ x ] The data lists should be paginated with 20 itens by page
- [ ] The user should be identificated by a JWT (Json Web Token)