var configObject = {
	dataTypes :
	[
            {
              name : 'Text',
              text : 'Text',
              type:'static',
              visible: true
            },
            {
              name : 'Email',
              text : 'Email',
              type:'static',
              visible: true
            },
            {
              name : 'URL',
              text : 'URL',
              type:'static',
              visible: true
            },
            {
              name : 'Number',
              text : 'Number',
               type: 'static',
               visible: true
            },
            {
              name : 'EncryptedText',
              text : 'Encrypted Text',
              type: 'static',
              visible: true
            },
            {
              name : 'Boolean',
              text : 'Boolean',
              type: 'static',
              visible: true
            },
            {
              name : 'DateTime',
              text : 'Date Time',
              type: 'static',
              visible: true
            },
            {
              name : 'GeoPoint',
              text : 'Geo Point',
              type: 'static',
              visible: true
            },
            {
              name : 'File',
              text : 'File',
              type: 'static',
              visible: true
            },
            {
              name : 'Id',
              text : 'ID',
              type: 'static',
              visible: false
            },
            {
              name : 'ACL',
              text : 'ACL',
              type: 'static',
              visible: false
            },
            {
              name : 'List',
              text : 'List',
              type: 'List',
              visible: true
            },
            {
              name : 'Relation',
              text : 'Relation',
              type: 'Relation',
              visible: true
            },
            {
              name : 'Object',
              text : 'Object',
              type: 'static',
              visible: true
            }

    ],

    filterTypes:[
      {
        type:['Text','Email','URL','EncryptedText','Boolean'],
        options:[
          '','equalTo','notEqualTo','startsWith','exists','doesNotExists'
        ]
      },
      {
        type:['Number','DateTime'],
        options:[
          '','equalTo','notEqualTo','greaterThan','lessThan','greaterThanEqualTo','lessThanEqualTo','exists','doesNotExists'
        ]
      },
      {
        type:['File','Object','Relation'],
        options:[
          '','exists','doesNotExists'
        ]
      },
      {
        type:['GeoPoint'],
        options:[
          '','near','geoWithin'
        ]
      },
      {
        type:['List'],
        options:[
          '','containedIn','notContainedIn','containsAll'
        ]
      }

    ]
}

export default configObject