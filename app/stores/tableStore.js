import { observable,computed } from 'mobx'

class TableStore {
	@observable TABLE = {}
	@observable tables = []
	@observable columns = []
	@observable columnsData = []
	@observable hiddenColumns = []
	@observable rowsToDelete = []

	@computed get getColumns(){
		if(this.columns.document){
			return this.columns.document.columns.map( x => x.document )
		} else {
			return []
		}
	}
	@computed get getColumnsData(){
		return this.columnsData.map( x => x.document )
	}
	@computed get getTables(){
		return this.tables.map( x => x.document )
	}

	initialize(tableName){
		CB.CloudTable.getAll().then((data)=>{
			if(data[0]){
				this.TABLE = data[0].document.name
			}
			if(tableName){
				this.TABLE = tableName
			}
			this.tables = data
			this.setColumns()
			this.setColumnsData()
		})
	}
	changeTable(tableName){
		this.TABLE = tableName
		this.setColumns()
		this.setColumnsData()
	}
	createTable(tableName){
		let table = new CB.CloudTable(tableName)
		table.save().then((res)=>{
			this.initialize(tableName)
		},(err)=>{
			console.log(err)			
		})
	}
	deleteTable(tableName){
		let table = this.tables.filter(x=> x.document.name == tableName)[0]
		table.delete().then((res)=>{
			this.initialize()
		},(err)=>{
			console.log(err)
		})
	}
	addColumn(column){
		let table = this.tables.filter(x=> x.document.name == this.TABLE)[0]
		table.addColumn(column);
		table.save().then((res)=>{
			this.setColumns()
			this.setColumnsData()
		},(err)=>{
			console.log(err)
		})
	}
	deleteColumn(column){
		let table = this.tables.filter(x=> x.document.name == this.TABLE)[0]
		table.deleteColumn(column);
		table.save().then((res)=>{
			this.setColumns()
			this.setColumnsData()
		},(err)=>{
			console.log(err)
		})
	}
	editColumn(columnName,uniqueValue,requiredValue){
		let table = this.tables.filter(x=> x.document.name == this.TABLE)[0]
		let column = table.getColumn(columnName)
		column['required'] = requiredValue
		column['unique'] = uniqueValue
		table.updateColumn(column);
		table.save().then((res)=>{
			this.setColumns()
			this.setColumnsData()
		},(err)=>{
			console.log(err)
		})
	}
	setColumns(){
		CB.CloudTable.get(this.TABLE).then((data)=>{
			this.columns = data
		})
	}
	setColumnsData(){
		let query = new CB.CloudQuery(this.TABLE)
		query.setLimit(20);
		query.find().then((list)=>{
			this.columnsData = list
		})
	}
	sortColumnsData(what,columnName){
		let query = new CB.CloudQuery(this.TABLE)
		query.setLimit(20);
		query[what](columnName);
		query.find().then((list)=>{
			this.columnsData = list
		})
	}

	search(searchString){
		let query = new CB.CloudQuery(this.TABLE)
		query.search('username',searchString)
		query.find().then((list)=>{
			console.log(list)
		},(err)=>{
			console.log(err)
		})
	}

	updateColumnsData(id,data){
		this.columnsData = this.columnsData.map((x)=>{
			if(x.id == id){
				x = data
			}
			return x
		})
	}

	addRow(data){
		data.save().then((res)=>{
			this.columnsData.push(data)
		},(err)=>{
			console.log(err)
		})
	}

	hideColumn(name){
		this.hiddenColumns.push(name)
	}

	removeHiddenColumn(name){
		this.hiddenColumns.splice(this.hiddenColumns.indexOf(name),1)
	}

	showAll(){
		this.hiddenColumns = this.hiddenColumns.filter(x => false)
	}

	addToDeleteRows(objectId){
		this.rowsToDelete.push(objectId)
	}
	removeFromDeleteRows(objectId){
		this.rowsToDelete.splice(this.rowsToDelete.indexOf(objectId),1)
	}
	deleteRows(){
		let prm = []
		this.columnsData.map((x)=>{
			this.rowsToDelete.forEach((i,index)=>{
				if(i == x.id){
					prm.push(x.delete())
				} 
			})
		})
		Promise.all(prm).then((res)=>{
			this.setColumnsData()
			this.rowsToDelete = []
		})
	}

}

export default new TableStore()