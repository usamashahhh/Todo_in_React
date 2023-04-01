import React, { Component } from 'react'
import { IoMdAddCircle } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai';


class Todo extends Component{

    constructor(){
        super()
        this.state={

            value: "",
            todo: [],
        }
    }

    componentDidMount(){

        this.setState({})
        let data= localStorage.getItem("Todo_List");

        if(data == null)
        {
            this.state.todo=[]
        }
        else
        {
            this.state.todo= JSON.parse(data)
        }

    }

    chgInp=(val)=>{

        this.setState({value:val})
    }
    submit=()=>{

        let obj={

            title: this.state.value,
            s: 0,
        }

        this.state.todo=[...this.state.todo,obj]
        localStorage.setItem("Todo_List",JSON.stringify(this.state.todo))

        this.setState({value:""})

        
    }
    edit=(ind)=>{

        for(let i=0; i<this.state.todo.length; i++)
        {
            this.state.todo[i].s=0
        }

        this.state.todo[ind].s=1

        this.setState({})
    }

    delete=(ind)=>{

        this.state.todo.splice(ind,1)
        localStorage.setItem("Todo_List",JSON.stringify(this.state.todo))
        this.setState({})
    }

    setNewTxt=(val,i)=>{

        this.state.todo[i].title=val
        this.setState({})
    }
    update=(i)=>{

        this.state.todo[i].s=0
        localStorage.setItem("Todo_List",JSON.stringify(this.state.todo))
        this.setState({})
    }

    render(){
        return(

            <div>

                <h1>Add Todo</h1>
                <input type="text" value={this.state.value} onChange={(e)=>this.chgInp(e.target.value)} />
                <button onClick={()=>this.submit()}><IoMdAddCircle/></button>

                {
                    this.state.todo.map((v,i)=>{

                        return(

                            v.s == 0 ?

                            <li key={i} style={{listStyle:'none', margin:12}}>
                                <AiFillStar/> {v.title}
                                <button onClick={()=>this.edit(i)}>Edit</button>
                                <button onClick={()=>this.delete(i)}>Delete</button>
                            </li>

                            :
                            <li key={i} style={{listStyle:'none',margin:12}}>
                                <AiFillStar/>
                                <input type="text" value={v.title} onChange={(n)=>this.setNewTxt(n.target.value,i)} />
                                <button onClick={()=>this.update(i)}>Update</button>
                            </li>
                        )
                    })
                }

            </div>
        )
    }
}
export default Todo;