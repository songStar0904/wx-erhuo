<template>
    <div class="tag" :style="setColorStyle">
    	<span><slot></slot></span>
    </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#19be6b'
    }
  },
  mounted () {
    console.log(this.color)
  },
  computed: {
    setColorStyle () {
      return {background: this.color}
    }
  }
}
</script>
<style scoped>
.tag {
	display: inline-block;
    height: 22px;
    line-height: 22px;
    margin: 2px 4px 2px 0;
    padding: 0 8px;
    border: 1px solid #e9eaec;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
}
</style>
