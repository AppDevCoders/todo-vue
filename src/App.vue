<template>
  <div id="app">

    <div class="container-fluid row">


      <!-- HEADER -->
      <div class="navbar navbar-default">
        <div class="container-fluid">

          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <img class="navbar-brand" src="./assets/logo.png">
            <a class="navbar-brand" href="#">{{ title }}</a>
          </div>

          <div class="collapse navbar-collapse" id="navbar1">
            <ul class="nav navbar-nav navbar-right">

              <li><a href="https://www.chamogeek.com" target="blank">
                <span class="glyphicon glyphicon-globe" aria-hidden="true"></span>
                ChamoGeek
                </a>
              </li>

            </ul>
          </div>

        </div>
      </div>
      <!-- /HEADER -->


      <!-- LIST -->
      <div class="panel panel-default" style="margin: 10px;">

        <div class="panel-heading">
          TO-DO List

          <div class="input-group pull-right" style="width: 350px; margin-top: -7px;">
            <input v-model="search" type="text" class="form-control" placeholder="Filter...">
            <span class="input-group-btn">
              <button class="btn btn-default disabled" type="button">
                <span class="glyphicon glyphicon-filter" aria-hidden="true"></span>
              </button>
              <button class="btn btn-default" type="button" @click="sortList">
                <span class="glyphicon glyphicon-sort-by-attributes" aria-hidden="true"></span>
              </button>
              <button class="btn btn-default" type="button" @click="clearList">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
              <button type="button" class="btn btn-default" @click="newItem" >
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
            </span>
          </div>

        </div>

        <div class="panel-body">

            <record  v-for="todo in filteredTodos" :key="todo.id"
              :item="todo"
              @itemchanged="updateTodo"
              @itemdeleted="deleteTodo">
            </record>

        </div>

        <div class="panel-footer">
            <div class="container-fluid row">
              <span class="badge pull-right">Total: {{total}}</span>
              <span class="badge danger pull-right">TODO: {{total - dones}}</span>
              <span class="badge success pull-right">Done: {{dones}}</span>
            </div>
        </div>

      </div>
      <!-- /LIST -->


      <!-- PERFORMANCE -->
      <label style="margin: 10px;">
        <input type="checkbox"
            v-model="showPerformanceTest"
            :checked="showPerformanceTest" >
        Show Performance Test
      </label>

      <performance v-if="showPerformanceTest"
         start="1"
         amount="10000"
         style="margin: 10px;">
      </performance>
      <!-- /PERFORMANCE -->


    </div>

  </div>
</template>



<script>
import Performance from './Performance.vue';

export default {
  name: 'app',

  components: {
    'performance': Performance
  },

  data () {
    return {
      title: 'TODO WebApp / VueJS 2.5.11',
      todos: [
        { id: 1, task: 'Learn Kotlin!',                   done: false, editing: false },
        { id: 2, task: 'Watch the movie: Thor Ragnarok',  done: false, editing: false },
        { id: 3, task: 'Travel to Germany',               done: false, editing: false },
        { id: 4, task: 'Travel to Argentina',             done: true,  editing: false },
      ],
      search: '',

      showPerformanceTest: false,
    }
  },

  /*
  created: {
    //--
  },
  */

  computed: {
    filteredTodos: function() {
      return this.todos.filter((t) => {
        return !this.search || t.task.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
      });
    },

    total: function() {
      return this.todos.length;
    },

    dones: function() {
      return this.todos.filter(t => t.done == true).length;
    },
  },

  methods: {
    sortList() {
      //alert("sortList()");
      this.todos.sort((a, b) => {
        return a.task > b.task;
      });
    },

    clearList() {
      //alert("clearList()");
      var result = confirm("Delete all tasks?");
      if (result) {
          this.todos.splice(0, this.todos.length);
      }
    },

    getMaxID() {
      return Math.max.apply(Math,this.todos.map(function(i){return i.id;}));
    },

    newItem() {
      //alert("newItem()");
      var newID = (this.getMaxID() || 0) + 1;

      this.todos.unshift(
        { id: newID, task: '', done: false, editing: true },
      );
    },

    updateTodo(todo) {
      //alert("update: " + JSON.stringify(todo));
      if (todo.task !== '') {
        var t = this.todos.find(t => t.id == todo.id);
        todo.editing = false;
        t = todo;
      }
    },

    deleteTodo(todo) {
      //alert("delete: " + JSON.stringify(todo));
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    }
  }
}
</script>



<style>
html, body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}

.navbar-brand {
  padding: 15px 10px !important;
}
.panel-body {
  padding: 2px !important;
  background-color: #eee;
}
.badge {
  color: #fff;
  background-color: gray;
}
.danger {
  color: #fff;
  background-color: red;
}
.success {
  color: #fff;
  background-color: green;
}
</style>
