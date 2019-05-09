const expect =require('chai').expect
const request=require('supertest')
const sinon= require('sinon')
const app = require('../../app')
const ObjectId = require('mongodb').ObjectID
const colImage= require('../../src/compImages/modelsImages')
const image = "/9j/4AAQSkZJRgABAQEASABIAAD/"
describe('tests images',()=>{
 
    describe('post /image',()=>{
        it('it should sauve new image',(done)=>{
            request(app).post('/images/post')
            .send({
                img:image,
                name:"My image",
                titre:'imgTest',
                idUser:'5ca2685087cf0102f401068a',
                datePublication:'2019-10-10',
                taille:11
            })
            .then((res)=> {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("message").equal('Image posted !')
                done()
            })
            .catch((err)=>{
                done(err)
            })   
            
        })
    })

    describe('GET /All images', () => {
        it('it should Get all the images', (done) => {
            
            let idUser = ObjectId("5ca2685087cf0102f401068a") 
            request(app).get('/images/showallimages/'+idUser)
            .then((res)=> {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("listUrl")
                expect(res.body).to.have.property("imgs")
                expect(res.body).to.have.property("message").equal("All images !")
                done()
            })
            .catch((err)=>{
                done(err)
            })  
        });
    });

    describe('GET /One image', () => {
        it('it should Get one image', (done) => {
            
            let id =ObjectId("5ca2685087cf0102f401068a")
            let key = 'MoDUPrwwxnEFUXEojSFTeVXrnjtpQz7QCz1KD-c6.undefined'
            request(app)
            .get('/images/showoneimage/'+id+'/'+key)
            .then((res)=> {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("url")
                expect(res.body).to.have.property("img")
                expect(res.body).to.have.property("message").equal("One image !")
                done()
            })
            .catch((err)=>{
                done(err)
            })  
        });
    })
    
    
    describe('Delete /One image', () => {
        it('it should delete one image', (done) => {
            
            let id =ObjectId("5ca2685087cf0102f401068a")       
            let key = "eVcNbB6uTg76zWZuP1SpxVaZnPxEVK4A6kvlIJZx.undefined"
            request(app)
            .delete('/images/delete/'+id+'/'+key)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property("message").equal('Image deleted.')
                done();
            })
            .catch((err)=>{
                done(err)
            })
        });
    })
    

    /*describe('Update /One image', () => {
        it('it should update one image', (done) => {
            
            let id =ObjectId("5ca4846827b2653e4c8b379c")       
            
            request(app)
            .put('/images/update/'+id)
            .then((res) => {
                expect(res.status).to.equal(200);
                done();
            })
            .catch((err)=>{
                done(err)
            })
        });
    })*/
    
})