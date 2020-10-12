import { data } from './data.js'

class Sorting {
    constructor(data){        
        this.data = data        
        this.template = `
        <tr>
        <th id="id" data-state="0">id🠓</th>
        <th id="title" data-state="0">title🠓</th>
        <th id="year" data-state="0">year🠓</th>
        <th id="imdb" data-state="0">imdb🠓</th>
        </tr>
        `
    }
    compareNum(a,b) {
        return a - b
    }
    compareLit(a,b) {
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    }

    remover() {
        document.getElementById('table').removeEventListener('click', () => this.bigSwitcher(event.target.dataset.state, event.target.id))
    }
 
    bigSwitcher(typeSwitch, type){
        
        if(typeSwitch === '0'){
            switch(type){
                case "id": {
                    this.data = this.data.sort((a,b) => a.id - b.id)
                    break    
                }
                case "imdb":{
                    this.data = this.data.sort((a,b) => a.imdb - b.imdb)
                    break    
                }
                case "year": {
                    this.data = this.data.sort((a,b) => a.year - b.year)
                    break    
                }
                case "title": {
                    this.data = this.data.sort((a,b) => {            
                        if(a.title > b.title) {return 1}                   
                        else if (a.title < b.title)  {return -1} 
                        else {return 0} ;
                    })
                    break    
                }
            }
        }
        else if (typeSwitch === '1'){            
            switch(type){
                case "id": {
                    this.data = this.data.sort((a,b) => b.id - a.id)
                    break    
                }
                case "imdb":{
                    this.data = this.data.sort((a,b) => b.imdb - a.imdb)
                    break    
                }
                case "year": {
                    this.data = this.data.sort((a,b) => b.year - a.year)
                    break    
                }
                case "title": {
                    this.data = this.data.sort((a,b) => {            
                        if(a.title > b.title) {return -1}                   
                        else if (a.title < b.title)  {return 1}
                        else return 0;
                    })
                }
            }            
        }        
    }
    newInitial(){
        document.getElementById('table').innerHTML = this.template
        this.remover()
        this.render();        
        
        document.getElementById('table').addEventListener('click', (event) => {
            this.bigSwitcher(event.target.dataset.state, event.target.id);
            if(event.target.dataset.state === "0"){
                event.target.dataset.state = "1"
                event.target.textContent = `${event.target.id}🠑`
            }
            else if(event.target.dataset.state === "1"){
                event.target.dataset.state = "0"
                event.target.textContent = `${event.target.id}🠓`
            }
            let length = document.getElementsByClassName('reloaded').length
            for(let i = 0; i < length; i++){
                let j = document.getElementsByClassName('reloaded')[document.getElementsByClassName('reloaded').length - 1]
                j.remove()
            }     
            this.render();           
        })
    }
    
    render() {
        let arrStr = [] 
        data.forEach((i)=> {
            arrStr.push(`<tr class="reloaded"><td>${i.id}</td><td>${i.title}</td><td>${i.year}</td><td>${i.imdb.toFixed(2)}</td></tr>`)}     
        )
    document.getElementById('table').innerHTML += arrStr.join("");
    }
}

let Functional = new Sorting(data)
Functional.newInitial()


