import { observable,computed } from 'mobx'

class TableStore {
	@observable TABLE = {}
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

	setColumns(){
		CB.CloudTable.get(this.TABLE).then((data)=>{
			this.columns = data
		})
	}
	setColumnsData(){
		var query = new CB.CloudQuery(this.TABLE);
		query.find().then((list)=>{
			this.columnsData = list
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