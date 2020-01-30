<template>
    <div class="pagination" v-if="pageCount > 1">
        <button class="pagination__btn pagination__btn-prev" :class="{'is-disabled' : $store.state.pagination.page === 0}" @click="prevPage">
            Previous
        </button>
        <ul class="pagination__list">
            <li class="pagination__item" :class="{'is-active' : (index === $store.state.pagination.page)}" @click="numberPage(index)" v-for="(p, index) in pageCount"  v-bind:key="index">
                {{index + 1}}
            </li>
        </ul>
        <button class="pagination__btn pagination__btn-next" :class="{'is-disabled' : $store.state.pagination.page === (pageCount - 1)}" @click="nextPage">
            Next
        </button>
    </div>
</template>
<script>
    export default {
        name: 'Pagination',
        data: function () {
            return {
                pageNumber: 0
            }
        },
        props:{

        },
        methods: {
            nextPage(){
                const _this = this;
                let page = this.$store.state.pagination.page;
                page++;
                _this.$store.commit("changePaginationPage", page)
            },
            prevPage(){
                const _this = this;
                let page = this.$store.state.pagination.page;
                page--;
                _this.$store.commit("changePaginationPage", page)
            },
            numberPage(index){
                const _this = this;
                _this.$store.commit("changePaginationPage", index)
            },
            paginatedData(){
                const start = this.pageNumber * this.size,
                    end = start + this.size;
                this.$store.commit("sliceTaskListPagination", start, end)
            }
        },
        computed: {
            pageCount(){
                let l = this.$store.state.taskList.length,
                    s = this.$store.state.pagination.size;
                return Math.ceil(l/s);
            }
        },
    }
</script>

<style lang="scss">
    @import "../scss/pagination.scss";
</style>

