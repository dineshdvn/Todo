import React from 'react';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort,faEdit,faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';


class Todo extends React.Component{
  constructor(props){
    super(props);
      this.state ={
          color1:'blue',
          color2:'blue',
          color3:'blue',
          Title:'',
          Description:'',
          DueDate:'',
          CreatedAt:'',
          Priority:'',
          disabled:false,
          temp:'',
          edit:false,
          delete:false,
          Done:false,
          selectedRow:'',
          status:'a',
          summarySort:false,
          prioritySort:false,
          createdonSort:false,
          duedateSort:false,
          searchText:'',
          temp1:'',
          count:0,
          gb:'',
          temp2:'',
          count1:0,
          gbData:''
      }
  }

  handleChange = (e) =>{
   if(this.state.color1==="blue" && e.target.value==="a"){
     this.setState({color1:'black',color2:'blue',color3:"blue"})
   }
   else if(this.state.color2==="blue" && e.target.value==="b"){
    this.setState({color1:'blue',color2:'black',color3:"blue"})
  }
  else if(this.state.color3==="blue" && e.target.value==="c"){
    this.setState({color1:'blue',color2:"blue",color3:'black'})
  }
  this.setState({status:e.target.value})
  }

  handleSummaryChange = (e) => {
    this.setState({Title:e.target.value})
  }

  handleDescriptionChange = (e) => {
    this.setState({Description:e.target.value})
  }

  handleDateChange = (e) => {
    this.setState({DueDate:e.target.value})
  }

  handlePriorityChange = (e) => {
    this.setState({Priority:e.target.value})
  }

  handleSubmit = (e) => {
  e.preventDefault();
  var d = new Date();
  var x=d.getFullYear() + '-' + d.getMonth()+1 + '-' + d.getDate()
  let data = {
    'currentState' : 'Pending',
    'Title' : this.state.Title,
    'Description' : this.state.Description,
    'CreatedAt' : x,
    'DueDate': this.state.DueDate,
    'Priority' : this.state.Priority,
    'edit':false
  }
 var temp=this.state.temp.Title
  let table=JSON.parse(localStorage.getItem('data'))
  if(this.state.edit){
    table = table.filter(function(item) {
      return item.Title !== temp
  })
  }
  table.splice(0, 0, data);
  localStorage.setItem('data',JSON.stringify(table))
  
  
  this.setState({Title:'',Description:'',CreatedAt:'',DueDate:'',Priority:'',edit:false,temp:'',temp1:'',count:0})
  }

  handleDoubleClick = title=> (e) => {
    var d = new Date();
    var x=d.getFullYear() + '-' + d.getMonth()+1 + '-' + d.getDate()
    var clickedRow = JSON.parse(localStorage.getItem('data'))
    for(let i=0;i<Object.keys(clickedRow).length;i++){
      if(clickedRow[i].Title===title){
        let data = {
        'currentState' : 'Pending',
        'Title' : this.state.Title,
        'Description' : this.state.Description,
        'CreatedAt' : x,
        'DueDate': this.state.DueDate,
        'Priority' : this.state.Priority,
        'edit':false
      }
        this.setState({Title:clickedRow[i].Title,Description:clickedRow[i].Description,DueDate:clickedRow[i].DueDate,Priority:clickedRow[i].Priority,disabled:true,temp:data,delete:false})
      }
      else{
        continue;
      }
    }
  }

  handleClose = (e) => {
    this.setState({Title:'',Description:'',CreatedAt:'',DueDate:'',Priority:'',disabled:false,edit:false,temp:'',delete:false})
  }

  handleDelete = del => (e) => {
    this.setState({delete:true})
    var d = new Date();
    var x=d.getFullYear() + '-' + d.getMonth()+1 + '-' + d.getDate()
    var editRow = JSON.parse(localStorage.getItem('data'))
    for(let i=0;i<Object.keys(editRow).length;i++){
      if(editRow[i].Title===del){
        let data = {
          'currentState' : 'Pending',
          'Title' : editRow[i].Title,
          'Description' : editRow[i].Description,
          'CreatedAt' : x,
          'DueDate': editRow[i].DueDate,
          'Priority' : editRow[i].Priority,
          'edit':false
        }
        this.setState({Title:editRow[i].Title,Description:editRow[i].Description,DueDate:editRow[i].DueDate,Priority:editRow[i].Priority,disabled:false,edit:true,temp:data,temp1:'',count:0})
      }
      else{
        continue;
      }
    }
  }

  handleDeleteConfirm = (e) => {
    var temp=this.state.temp.Title
  let table=JSON.parse(localStorage.getItem('data'))
    table = table.filter(function(item) {
      return item.Title !== temp
  })
  localStorage.setItem('data',JSON.stringify(table))
  this.setState({Title:'',Description:'',CreatedAt:'',DueDate:'',Priority:'',edit:false,temp:'',delete:false})
  
  }

  handleEdit = edit => (e) => {
    var d = new Date();
    var x=d.getFullYear() + '-' + d.getMonth()+1 + '-' + d.getDate()
    var editRow = JSON.parse(localStorage.getItem('data'))
    for(let i=0;i<Object.keys(editRow).length;i++){
      if(editRow[i].Title===edit){
        let data = {
          'currentState' : 'Pending',
          'Title' : editRow[i].Title,
          'Description' : editRow[i].Description,
          'CreatedAt' : x,
          'DueDate': editRow[i].DueDate,
          'Priority' : editRow[i].Priority,
          'edit':false
        }
        this.setState({Title:editRow[i].Title,Description:editRow[i].Description,DueDate:editRow[i].DueDate,Priority:editRow[i].Priority,disabled:false,edit:true,temp:data})
      }
      else{
        continue;
      }
    }
  }

  handleDone = done => (e) =>{
    if(this.state.gb==="" || this.state.count1===0){
      this.setState({Done:true,selectedRow:done})
      var doneRow = JSON.parse(localStorage.getItem('data'))
      for(let i=0;i<Object.keys(doneRow).length;i++){
        console.log('temp1',doneRow)
        if(doneRow[i].Title===done){
          doneRow[i].currentState="Completed"
          console.log(doneRow[i].currentState)
        }
        else{
          continue;
        }
      }
    }
    else if(this.state.gb!=="" || this.state.count1!==0){
      this.setState({Done:true,selectedRow:done})
      doneRow = this.state.temp2
      console.log('temp2',doneRow)
      for(let i=0;i<Object.keys(doneRow).length;i++){
        if(doneRow[i].Title===done){
          doneRow[i].currentState="Completed"
          console.log(doneRow[i].currentState)
        }
        else{
          continue;
        }
      }
    }
   
    localStorage.setItem('data',JSON.stringify(doneRow))
  }

   handleSummarySort = (e) =>{
     e.preventDefault();
     var array1=[]
     var array2=[]
    let table=JSON.parse(localStorage.getItem('data'));
    for(let i=0;i<Object.keys(table).length;i++){
      array1.push(table[i].Title)
    }
    array1.sort()
    for(let j=0;j<array1.length;j++){
      for(let k=0;k<Object.keys(table).length;k++){
        if(array1[j]===table[k].Title){
          array2.push(table[k])
        }
        else{
          continue
        }
      }
    }
    if(!this.state.summarySort){
      this.setState({summarySort:true})
      localStorage.setItem('data',JSON.stringify(array2))
    }
    else if(this.state.summarySort){
      this.setState({summarySort:false})
      localStorage.setItem('data',JSON.stringify(array2.reverse()))
    }
    
   }

   handlePrioritySort = (e) =>{
     var array1=[]
     var array2=[]
     var array3=[]
     var array4=[]
     
      let table=JSON.parse(localStorage.getItem('data'));
      for(let i=0;i<Object.keys(table).length;i++){
        if(table[i].Priority==="None"){
          array1.push(table[i])
          console.log(array1)
        }
        else if(table[i].Priority==="Low"){
          array2.push(table[i])
        }
        else if(table[i].Priority==="Medium"){
          array3.push(table[i])
        }
        else if(table[i].Priority==="High"){
          array4.push(table[i])
        }
      }
      if(!this.state.prioritySort){
        this.setState({prioritySort:true})
        localStorage.setItem('data',JSON.stringify(array1.concat(array2,array3,array4)))
      }
      else if(this.state.prioritySort){
        this.setState({prioritySort:false})
        localStorage.setItem('data',JSON.stringify(array4.concat(array3,array2,array1)))
      }
   }

   handleCreatedOnSort =(e) =>{
    
   let table=JSON.parse(localStorage.getItem('data'));
   table.sort((a, b) => {
    return new Date(a.CreatedAt) - new Date(b.CreatedAt);
});
   
   if(!this.state.createdonSort){
     this.setState({createdonSort:true})
     localStorage.setItem('data',JSON.stringify(table))
   }
   else if(this.state.createdonSort){
     this.setState({createdonSort:false})
     localStorage.setItem('data',JSON.stringify(table.reverse()))
   }
   }

   handleDueDateSort = (e) =>{
    let table=JSON.parse(localStorage.getItem('data'));
   table.sort((a, b) => {
    return new Date(a.DueDate) - new Date(b.DueDate);
});
   
   if(!this.state.duedateSort){
     this.setState({duedateSort:true})
     localStorage.setItem('data',JSON.stringify(table))
   }
   else if(this.state.duedateSort){
     this.setState({duedateSort:false})
     localStorage.setItem('data',JSON.stringify(table.reverse()))
   }
   }

   handleSearch = (e) =>{
    this.setState({searchText:e.target.value})
    if(this.state.count===0)
    {
      this.setState({temp1:JSON.parse(localStorage.getItem('data')),count:1})
      var table=JSON.parse(localStorage.getItem('data'))
      table=table.filter(val => {
        return val.Title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || val.Priority.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || val.CreatedAt.indexOf(e.target.value) !== -1 || val.DueDate.indexOf(e.target.value) !== -1;
      });
    }
    else{
       table=this.state.temp1
      table=table.filter(val => {
        return val.Title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || val.Priority.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || val.CreatedAt.indexOf(e.target.value) !== -1 || val.DueDate.indexOf(e.target.value) !== -1;
      });
    }
    
    localStorage.setItem('data',JSON.stringify(table))
    

}

handleGBChange =(e) =>{
  
  if(this.state.count1===0){
    this.setState({temp2:JSON.parse(localStorage.getItem('data')),count1:1})
      var table=JSON.parse(localStorage.getItem('data'))
      if(e.target.value==="Priority"){
  
        let finalObj = {}
            table.forEach((rows) => {
              if (finalObj[rows.Priority]) {
                finalObj[rows.Priority].push(rows);
              } else {
                finalObj[rows.Priority] = [rows];
              }
            })
            table=finalObj
        }
        if(e.target.value==="Created On"){
          let finalObj = {}
            table.forEach((rows) => {
              if (finalObj[rows.CreatedAt]) {
                finalObj[rows.CreatedAt].push(rows);
              } else {
                finalObj[rows.CreatedAt] = [rows];
              }
            })
            table=finalObj
        }
        if(e.target.value==="Pending On"){
          let finalObj = {}
            table.forEach((rows) => {
              if (finalObj[rows.DueDate]) {
                finalObj[rows.DueDate].push(rows);
              } else {
                finalObj[rows.DueDate] = [rows];
              }
            })
            table=finalObj
          }
        if(e.target.value==="None"){
          
        }
        
  }
  else{
    table=this.state.temp2
    
      if(e.target.value==="Priority"){
  
        let finalObj = {}
            table.forEach((rows) => {
              if (finalObj[rows.Priority]) {
                finalObj[rows.Priority].push(rows);
              } else {
                finalObj[rows.Priority] = [rows];
              }
            })
            table=finalObj
        }
        if(e.target.value==="Created On"){
          let finalObj = {}
            table.forEach((rows) => {
              if (finalObj[rows.CreatedAt]) {
                finalObj[rows.CreatedAt].push(rows);
              } else {
                finalObj[rows.CreatedAt] = [rows];
              }
            })
            table=finalObj
        }
        if(e.target.value==="Pending On"){
          let finalObj = {}
            table.forEach((rows) => {
              if (finalObj[rows.DueDate]) {
                finalObj[rows.DueDate].push(rows);
              } else {
                finalObj[rows.DueDate] = [rows];
              }
            })
            table=finalObj
          }
          if(e.target.value==="None"){
          }
          this.setState({gbData:table})
  }
  
    this.setState({gb:e.target.value})
    console.log(table)
    console.log(typeof(table))
    localStorage.setItem('data',JSON.stringify(table))
}
  
  componentWillMount(){
    var array=[{'currentState':'Pending','Title':'Purchase Notebook','Description':'Purchase Notebook from Store','CreatedAt':'2020-04-19','DueDate':'2020-04-21','Priority':'Low'},
                {'currentState':'Pending','Title':'Buy Groceries','Description':'Purchase Groceries from Store','CreatedAt':'2020-04-19','DueDate':'2020-04-24','Priority':'Medium'},
                {'currentState':'Pending','Title':'Refill Ink Pen','Description':'Refill Ink Pen','CreatedAt':'2020-04-18','DueDate':'2020-04-22','Priority':'None'},
                {'currentState':'Pending','Title':'Prepare Presentation','Description':'Prepare Presentation','CreatedAt':'2020-04-17','DueDate':'2020-04-24','Priority':'High'},
                {'currentState':'Pending','Title':'Play Badminton','Description':'Play Badminton','CreatedAt':'2020-04-19','DueDate':'2020-04-21','Priority':'High'}]
    this.setState({color1:'black'})
    localStorage.setItem('data',JSON.stringify(array))
  }
  render(){
    if(this.state.gb!=="" || this.state.count1!==0){
      if(this.state.gbData===""){
       var gb=JSON.parse(localStorage.getItem('data'))
      }
      else{
        gb= this.state.gbData
      }
      
      console.log('gb',gb)
      console.log('gb2',this.state.temp2)
    }
    else if(this.state.gb==="" || this.state.count1===0 || this.state.gbData===""){
      gb=JSON.parse(localStorage.getItem('data'))
    }
    
    if(this.state.Title.length<10){
     var warningTitle = <span className="text text-danger">Minimum 10 characters required</span>
    }
    else if(this.state.Title.length>140){
    warningTitle = <span className="text text-danger">Maximum 140 characters required</span>
    }

    if(this.state.Description.length<10){
      var warningDescription = <span className="text text-danger">Minimum 10 characters required</span>
    }
    else if(this.state.Description.length>140){
      warningDescription= <span className="text text-danger">Maximum 500 characters required</span>
      }

    if(this.state.delete){
     var del = (
     <div class="modal fade" id="myModal" role="dialog">
       <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
           <h4 class="modal-title">Delete</h4>
             <button type="button" class="close" data-dismiss="modal">&times;</button>
             
           </div>
           <div class="modal-body">
             <p>Do you want to delete this task?</p>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>No</button>
             <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.handleDeleteConfirm}>Yes</button>
           </div>
         </div>
         
       </div>
     </div>)
    }

    
    
    
    return(
      <div class="container">
        <div className="row">
            <div className="card" style={{"width":"800px","height":"100%"}}>
              <div className="card-body">
                <div className="row">
                  <div className="col-10 col-lg-10">
                  <h2>ToDo App</h2>
                  </div>
                  {del}
                <div className="col-2">
                <button type="button" className="btn btn-primary rounded-circle" data-toggle="modal" data-target="#exampleModal" style={{"width":"40px","height":"40px"}}>
                  +
                </button>
                
                <div className="modal hide fade in" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                      <form>
                        <div className="form-group">
                          <label for="summary">Summary</label>
                          <input type="text" className="form-control" id="summary"  placeholder="Summary" onChange={this.handleSummaryChange} value={this.state.Title} disabled={this.state.disabled}/>
                          {warningTitle}
                        </div>
                        <div className="form-group">
                          <label for="description">Description</label>
                          <textarea type="text" className="form-control" id="description" placeholder="Description" rows="3" onChange={this.handleDescriptionChange} value={this.state.Description} disabled={this.state.disabled}/>
                          {warningDescription}
                        </div>
                        <div className="row">
                          <div className="col-6">
                          <div className="form-group">
                          <label for="date">Due Date</label>
                          <input type="date" className="form-control" id="date" placeholder="Description" onChange={this.handleDateChange} value={this.state.DueDate} disabled={this.state.disabled}/>
                        </div>
                          </div>
                          <div className="col-6">
                          <div className="form-group">
                          <label for="priority">Priority</label>
                          <select className="custom-select" id="inputGroupSelect01" onChange={this.handlePriorityChange} value={this.state.Priority} disabled={this.state.disabled}>
                              <option  value="None" selected>None</option>
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                        </div>
                          </div>
                        </div>
                      </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.handleSubmit}>Save</button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>
                <div className="row" style={{"marginTop":"10px"}}>
                  <div className="col-4">
                  <h6>Group By</h6>
                            <select className="custom-select" id="inputGroupSelect01" onChange={this.handleGBChange}>
                              <option  value="None" selected>None</option>
                              <option value="Created On">Created On</option>
                              <option value="Pending On">Pending On</option>
                              <option value="Priority">Priority</option>
                            </select>
                  </div>
                  <div className="col-8">
                    <h6>Search</h6>
                      <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Search Tasks" onChange={this.handleSearch}/>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col">
                    <button type="button" value="a" style={{"border":0,"backgroundColor":"white","color":this.state.color1}} onClick={this.handleChange}>All</button>
                    <button type="button" value="b" style={{"border":0,"backgroundColor":"white","color":this.state.color2}} onClick={this.handleChange}>Pending</button>
                    <button type="button" value="c" style={{"border":0,"backgroundColor":"white","color":this.state.color3}} onClick={this.handleChange}>Completed</button>
                    <hr/>
                  </div>
                </div>
                <div className="row">
                <table class="table">
  <thead>
    <tr>
      <th scope="col">Summary <button type="button" className="btn btn-primary" onClick={this.handleSummarySort} style={{"fontSize":"2px","float":"right"}}><FontAwesomeIcon icon={faSort} size="4x" /></button></th>
      <th scope="col">Priority <button type="button" className="btn btn-primary" onClick={this.handlePrioritySort} style={{"fontSize":"2px","float":"right"}}><FontAwesomeIcon icon={faSort} size="4x" /></button></th>
      <th scope="col">Created On <button type="button" className="btn btn-primary" onClick={this.handleCreatedOnSort} style={{"fontSize":"2px","float":"right"}}><FontAwesomeIcon icon={faSort} size="4x" /></button></th>
      <th scope="col">Due By <button type="button" className="btn btn-primary" onClick={this.handleDueDateSort} style={{"fontSize":"2px","float":"right"}}><FontAwesomeIcon icon={faSort} size="4x" /></button></th>
      <th scope="col">Actions <button type="button" className="btn btn-primary" style={{"fontSize":"2px","float":"right"}}><FontAwesomeIcon icon={faSort} size="4x" /></button></th>
    </tr>
  </thead>
  <tbody>
      
    
{this.state.gb!=="" && this.state.gb!=="None"?
Object.keys(gb).map((row,index)=>{
  return( 
<React.Fragment>
  <tr><td></td><td></td><td className="text-center"><th>{row}</th></td></tr>
  {gb[row].map((value)=>{
return(<React.Fragment>
  {value.currentState==="Pending"?
    <tr key={index}><td   data-toggle="modal" data-target="#exampleModal"onClick={this.handleDoubleClick(value.Title)}>{value.Title}</td>
    <td  data-toggle="modal" data-target="#exampleModal" onClick={this.handleDoubleClick(value.Title)}>{value.Priority}</td>
    <td   data-toggle="modal" data-target="#exampleModal"onClick={this.handleDoubleClick(value.Title)}>{value.CreatedAt}</td>
    <td  data-toggle="modal" data-target="#exampleModal" onClick={this.handleDoubleClick(value.Title)}>{value.DueDate}</td>
    <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.handleEdit(value.Title)} disabled="true"><FontAwesomeIcon icon={faEdit} size="0x" /></button>
<button type="button" className="btn btn-success" onClick={this.handleDone(value.Title)} disabled="true">{value.currentState==="Completed"?"Re-Open":"Done"}</button>
        <button type="button" className="btn btn-danger" onClick={this.handleDelete(value.Title)} data-toggle="modal" data-target="#myModal" disabled="true"><FontAwesomeIcon icon={faTrashAlt} size="0x" /></button>
    </td></tr>
    : <tr key={index}><td   data-toggle="modal" data-target="#exampleModal"onClick={this.handleDoubleClick(value.Title)}><del>{value.Title}</del></td>
    <td  data-toggle="modal" data-target="#exampleModal" onClick={this.handleDoubleClick(value.Title)}><del>{value.Priority}</del></td>
    <td   data-toggle="modal" data-target="#exampleModal"onClick={this.handleDoubleClick(value.Title)}><del>{value.CreatedAt}</del></td>
    <td  data-toggle="modal" data-target="#exampleModal" onClick={this.handleDoubleClick(value.Title)}><del>{value.DueDate}</del></td>
    <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.handleEdit(value.Title)} disabled="true"><FontAwesomeIcon icon={faEdit} size="0x" /></button>
<button type="button" className={value.currentState==="Completed"?"btn btn-info":"btn btn-success"} onClick={this.handleDone(value.Title)} disabled="true">{value.currentState==="Completed"?"Re-Open":"Done"}</button>
        <button type="button" className="btn btn-danger" onClick={this.handleDelete(value.Title)} data-toggle="modal" data-target="#myModal" disabled="true"><FontAwesomeIcon icon={faTrashAlt} size="0x" /></button>
    </td></tr>}
 
   

 
 </React.Fragment>)
    } )}
</React.Fragment>
  
   )
}

)
: JSON.parse(localStorage.getItem('data')).map((row,index)=>{
  return(
    
    
    row.currentState==="Pending" && this.state.status==="b"?
  <tr key={index}><td   data-toggle="modal" data-target="#exampleModal"onClick={this.handleDoubleClick(row.Title)}>{row.Title}</td>
                        <td  data-toggle="modal" data-target="#exampleModal" onClick={this.handleDoubleClick(row.Title)}>{row.Priority}</td>
                        <td   data-toggle="modal" data-target="#exampleModal"onClick={this.handleDoubleClick(row.Title)}>{row.CreatedAt}</td>
                        <td  data-toggle="modal" data-target="#exampleModal" onClick={this.handleDoubleClick(row.Title)}>{row.DueDate}</td>
                        <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.handleEdit(row.Title)}><FontAwesomeIcon icon={faEdit} size="0x" /></button>
<button type="button" className="btn btn-success" onClick={this.handleDone(row.Title)}>{row.currentState==="Completed"?"Re-Open":"Done"}</button>
                            <button type="button" className="btn btn-danger" onClick={this.handleDelete(row.Title)} data-toggle="modal" data-target="#myModal"><FontAwesomeIcon icon={faTrashAlt} size="0x" /></button>
                        </td></tr>
  :row.currentState==="Completed" && this.state.status==="c"?<tr key={index}>
  <td   data-toggle="modal" data-target="#exampleModal"onClick={this.handleDoubleClick(row.Title)}><del>{row.Title}</del></td>
  <td  data-toggle="modal" data-target="#exampleModal" onClick={this.handleDoubleClick(row.Title)}><del>{row.Priority}</del></td>
  <td   data-toggle="modal" data-target="#exampleModal"onClick={this.handleDoubleClick(row.Title)}><del>{row.CreatedAt}</del></td>
  <td  data-toggle="modal" data-target="#exampleModal" onClick={this.handleDoubleClick(row.Title)}><del>{row.DueDate}</del></td>
  <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.handleEdit(row.Title)}><FontAwesomeIcon icon={faEdit} size="0x" /></button>
<button type="button" className="btn btn-success" onClick={this.handleDone(row.Title)}>{row.currentState==="Completed"?"Re-Open":"Done"}</button>
      <button type="button" className="btn btn-danger" onClick={this.handleDelete(row.Title)} data-toggle="modal" data-target="#myModal"><FontAwesomeIcon icon={faTrashAlt} size="0x" /></button>
  </td></tr>:this.state.status==="a"?<tr key={index}><td   data-toggle="modal" data-target="#exampleModal"onClick={this.handleDoubleClick(row.Title)}>{row.Title}</td>
                        <td  data-toggle="modal" data-target="#exampleModal" onClick={this.handleDoubleClick(row.Title)}>{row.Priority}</td>
                        <td   data-toggle="modal" data-target="#exampleModal"onClick={this.handleDoubleClick(row.Title)}>{row.CreatedAt}</td>
                        <td  data-toggle="modal" data-target="#exampleModal" onClick={this.handleDoubleClick(row.Title)}>{row.DueDate}</td>
                        <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.handleEdit(row.Title)}><FontAwesomeIcon icon={faEdit} size="0x" /></button>
<button type="button" className={row.currentState==="Completed"?"btn btn-info":"btn btn-success"} onClick={this.handleDone(row.Title)}>{row.currentState==="Completed"?"Re-Open":"Done"}</button>
                            <button type="button" className="btn btn-danger" onClick={this.handleDelete(row.Title)} data-toggle="modal" data-target="#myModal"><FontAwesomeIcon icon={faTrashAlt} size="0x" /></button>
                        </td></tr>:null
          
    )}
)}
     
        
        
      
    
      
      
    
 
  </tbody>
</table>
                </div>
                
          
                
                
                       
                     
               </div>
            </div>
          </div>
        </div>
    )
}
}

export default Todo;