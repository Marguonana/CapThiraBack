process.env.NODE_ENV='test'
const expect =require('chai').expect
const request=require('supertest')
const sinon= require('sinon')
const app = require('../../app')
const db = require('../../dataBase')
const ObjectId = require('mongodb').ObjectID


describe('tests users',()=>{
    
    

    describe('post /users',()=>{
        it('it should create new user',(done)=>{
            request(app).post('/users/post')
            .send({
                nameUser: 'ZAIDI',
                lastname: 'Mohand Ameziane',
                age: 23,
                username: 'mohandamezianezaidi@gmail.com',
                password: 'pwd123654'
            })
            .then((res)=> {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("message").equal('User posted !')
                expect(res.body.user).to.have.property("_id")
                expect(res.body.user).to.have.property("nameUser")
                expect(res.body.user).to.have.property("lastname")
                expect(res.body.user).to.have.property("password")
                expect(res.body.user).to.have.property("token")
                done()
            })
            .catch((err)=>{
                done(err)
            })   
            
        })
    })


    describe('GET /All Users', () => {
        it('it should Get all the Users', (done) => {
            
            request(app).get('/users/showAllUsers')
            .then((res)=> {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object')
                expect(res.body.user).to.be.a('array')
                res.body.user.forEach(element => {
                    expect(element).to.have.property("_id")
                    expect(element).to.have.property("nameUser")
                    expect(element).to.have.property("lastname")
                    expect(element).to.have.property("password")
                    expect(element).to.have.property("password")
                    expect(element).to.have.property("token")
                })
                done()
            })
            .catch((err)=>{
                done(err)
            })  
        });
    });

    describe('GET /One User', () => {
        it('it should Get one user', (done) => {
            
            let id =ObjectId("5ca2685087cf0102f401068a")       
            
            request(app)
            .get('/users/showOneUser/'+id)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object')
                expect(res.body.user).to.have.property("_id")
                expect(res.body.user).to.have.property("nameUser")
                expect(res.body.user).to.have.property("lastname")
                expect(res.body.user).to.have.property("password")
                expect(res.body.user).to.have.property("token")
                done();
            })
            .catch((err)=>{
                done(err)
            })  
        });
    })
    
    describe('Delete /One User', () => {
        it('it should delete one user', (done) => {
            
            let id =ObjectId("5ca4846827b2653e4c8b379c")       
            
            request(app)
            .delete('/users/delete/'+id)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("message").equal('User deleted')
                done();
            })
            .catch((err)=>{
                done(err)
            })
        });
    })

    describe('Update /One User', () => {
        it('it should update one user', (done) => {
            
            let id =ObjectId("5ca2685087cf0102f401068a")
            request(app)
            .put('/users/update/'+id)
            .send({
                name: 'BENARAB',
                lastname: 'Lahlou',
                age: 24,
                username: 'lahloubena@gmail.com',
                password: 'Zaidi2'
            })
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("message").equal('User Updated !')
                expect(res.body.user).to.have.property("_id")
                expect(res.body.user).to.have.property("nameUser")
                expect(res.body.user).to.have.property("lastname")
                expect(res.body.user).to.have.property("password")
                expect(res.body.user).to.have.property("token")
                done();
            })
            .catch((err)=>{
                done(err)
            })
        });
    })

    describe('Login /One User', () => {
        it('it should login', (done) => {
            
            let password ='toto'
            let username ="zareb@gmail.com"
            request(app)
            .get('/users/login/'+username+'/'+password)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("message").equal('success login')
                expect(res.body.user).to.have.property("_id")
                expect(res.body.user).to.have.property("nameUser")
                expect(res.body.user).to.have.property("lastname")
                expect(res.body.user).to.have.property("password")
                expect(res.body.user).to.have.property("token")
                
               done();
            })
            .catch((err)=>{
                done(err)
            })
        });
    })
})
