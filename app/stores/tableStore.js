import { observable,computed } from 'mobx'

class TableStore {
	@observable columns = []
	@observable columnsData = []

	setColumns(table){
		CB.CloudTable.get(table).then((data)=>{
			this.columns = data
		})
	}
	setColumnsData(table){
		var query = new CB.CloudQuery(table);
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

}

export default new TableStore()