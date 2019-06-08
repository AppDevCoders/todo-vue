<template>
    <div class="record">
        <form class="form-inline">

            <button @click="toogleItem" type="button" class="btn btn-sm">
                <span v-if="!row.done" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
                <span v-if="row.done" class="glyphicon glyphicon-check" aria-hidden="true"></span>
            </button>

            <div class="form-group">
                <input v-model="row.task" placeholder="Task?" type="text" class="form-control" 
                    :class="{ 'done': row.done }"
                    :readonly="!row.editing" 
                    @dblclick="editItem"
                    @keyup.13="saveItem">                
            </div>
                                
            <button @click="editItem" v-if="!row.editing" type="button" class="btn btn-sm">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>

            <button @click="deleteItem" v-if="!row.editing" type="button" class="btn btn-sm" >
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>

            <button @click="saveItem" v-if="row.editing" type="button" class="btn btn-sm" >
                <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
            </button>
                        
        </form>
    </div>    
</template>


<script>
export default {
  //el: 'record',
  props: ['item'],

  data () {
    return {      
      row: this.item,
    }
  },

  methods: {
    toogleItem() {
        //alert("toogleItem()");
        this.row.done = !this.row.done;        
        this.$emit('itemchanged', this.row );
    },
    
    editItem() {
        //alert("editItem()");
        this.row.editing = true;
    },

    deleteItem() {
        //alert("deleteItem()");
        var result = confirm("Delete this task?");
        if (result) {
            this.$emit('itemdeleted', this.row );
        }        
    },

    saveItem() {
        //alert("saveItem()");        
        this.$emit('itemchanged', this.row );
    },
  }
}
</script>



<style scoped>
form {
  display: flex;  
  padding: 1px;  
  border-bottom: #ddd 1px solid;
}
.form-control {
  padding: 0.5em 1em;
  width: 100% !important;
  flex-grow: 1;
  box-sizing: border-box;
  border: none !important;
  box-shadow: none !important;
}
.form-group {
  flex-grow: 1;
  margin: 0px;
}
div.checkbox {
  height: 34px;
  width: 34px;
}
button {
  padding: 0.5em 1em;
  border: none;
  height: 34px;
}
.done {
  text-decoration: line-through;
}
</style>
