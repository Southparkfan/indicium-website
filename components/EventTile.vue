<template>
  <a class="event-tile container" :href="event.url">
    <div class="color-container">
      <div v-for="(colorObj, idx) in getCategoryColors" :key="idx" :style="{ backgroundColor: `#${colorObj.hex}`}"></div>
    </div>
    <h5>{{ toDateString }}</h5>
    <h4>{{ event.title }}</h4>
    <p class="small">{{ event.description.slice(0, 140) }}</p>
  </a>
</template>

<script>
export default {
  name: 'EventTile',
  props: {
    event: {
      type: Object,
      required: true,
    },
    allCategories: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  computed: {
    toDateString() {
      const date = new Date(this.event.date * 1000)
      return `${date.getDate()} ${this.getMonthAsString(date.getMonth())} ${date.getFullYear()}`
    },
    getCategoryColors() {
      return this.allCategories.reduce((activeCategories, category) => {
        if (this.event.categories !== '') {
          const categories = this.event.categories.map(c => c)
          if (categories.includes(category.courseTitle)) {
            activeCategories.push(category)
          }
        }

        return activeCategories
      }, [])
    }
  },
  methods: {
    getMonthAsString(currentMonth) {
      const monthList = [
        'Januari',
        'Februari',
        'Maart',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'Oktober',
        'November',
        'December'
      ]

      return monthList[currentMonth]
    }
  }
}
</script>

<style lang='scss' scoped>
.event-tile {
  display: inline-flex;
  position: relative;
  min-width: 300px;
  flex: 1;
  flex-direction: column;
  margin: 16px;
  background: #f3f8fa;
  padding: 16px;
  box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.1);
  transition: box-shadow 300ms;

  &:hover {
    box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.3);
  }

  .color-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    width: 100%;
    display: flex;

    div {
      display: inline-flex;
      flex: 1;
      height: 100%;
    }
  }

  h5 {
    color: #72c9e0;
    margin: 0 0 8px 0;
  }

  h4 {
    color: #8d8f91;
    margin: 0;
  }

  p {
    color: #8d8f91;
    margin: 0;
    text-overflow: ellipsis;
  }
}
</style>
