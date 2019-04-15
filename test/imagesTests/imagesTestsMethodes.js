const expect =require('chai').expect
const request=require('supertest')
const sinon= require('sinon')
const app = require('../../app')
const ObjectId = require('mongodb').ObjectID
const colImage= require('../../src/compImages/modelsImages')
describe('tests images',()=>{
    
    let image= new colImage({
        key: 1,
        title:'imgTest',
        idUser:'5ca2685087cf0102f401068a',
        datePublication:'04-05-2019',
        size:11
    })

    describe('post /image',()=>{
        it('it should sauve new image',(done)=>{
            request(app).post('/images/post')
            .send(image)
            .then((res)=> {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("message").equal('Image posted !')
                expect(res.body.image).to.have.property("key")
                expect(res.body.image).to.have.property("title")
                expect(res.body.image).to.have.property("idUser")
                expect(res.body.image).to.have.property("datePublication")
                done()
            })
            .catch((err)=>{
                done(err)
            })   
            
        })
    }) //à valider avec l'équipe 

    describe('GET /All images', () => {
        it('it should Get all the images', (done) => {
            
            request(app).get('/images/showallimages')
            .then((res)=> {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object')
                expect(res.body.listurl).to.be.a('array')
                expect(res.body).to.have.property("listurl")
                res.body.img.forEach(element => {
                    expect(element).to.have.property("key")
                    expect(element).to.have.property("title")
                    expect(element).to.have.property("idUser")
                    expect(element).to.have.property("datePublication")
                })
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
            
            request(app)
            .get('/images/showoneimage/'+id)
            .then((res)=> {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property("s3Url")
                expect(res.body.image).to.have.property("key")
                expect(res.body.image).to.have.property("title")
                expect(res.body.image).to.have.property("idUser")
                expect(res.body.image).to.have.property("datePublication")
                done()
            })
            .catch((err)=>{
                done(err)
            })  
        });
    })
    
    
    describe('Delete /One image', () => {
        it('it should delete one image', (done) => {
            
            let id =ObjectId("5ca4846827b2653e4c8b379c")       
            
            request(app)
            .delete('/images/delete/'+id)
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

    
})