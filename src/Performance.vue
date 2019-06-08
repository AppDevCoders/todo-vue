<template>
    <div class="panel panel-default">

        <div class="panel-heading"> 

            Performance Test - Calc the first {{amount}} prime numbers

            <button @click="startTest" type="button" class="btn btn-default btn-sm" >
                <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
            </button>
            <button @click="clearTest" type="button" class="btn btn-default btn-sm" >
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>

            Time: {{ elapsedtime }} milliseconds
        </div>

        <div class="panel-body">

            <div class="badge prime"
                v-for="number in numbers" :key="number">            
                {{number}}
            </div>

        </div>

    </div>    
</template>


<script>
export default {
  //el: 'performance',
  props: ['start', 'amount'],

  data () {
    return {            
      numbers: [],
      elapsedtime: 0,
    }
  },

  methods: {
    startTest() {
        this.clearTest();

        var num = parseInt(this.start);
        var limit = parseInt(this.amount);

        var starttime = new Date().getTime();        
        for(var i = 1; i <= limit; i++) {

            num = this.nextPrimeNumber(num);
            this.numbers.unshift(num);     
            
            num = num + 1;
        }
        this.elapsedtime = new Date().getTime() - starttime;
    },    

    nextPrimeNumber(num) {
        var result = false;
        while (!result) {
            result = this.isPrime(num);
            if (!result) {
                num = num + 1;
            }
        }
        return num;        
    },

    isPrime(num) {
        for(var i = 2; i < num; i++)
            if(num % i === 0) return false;
        return num !== 1;
    },
    
    clearTest() {
        this.numbers.splice(0, this.numbers.length);
        this.elapsedtime = 0;
    },
  }
}
</script>



<style scoped>
.prime {
    margin: 3px;
    padding: 3px;
}
</style>