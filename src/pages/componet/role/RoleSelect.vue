<template>
    <el-dialog
            width="30%"
            title="选择角色"
            :close-on-click-modal="false"
            :visible.sync="showDialog"
            @open="showSelectedRoles"
            append-to-body>

        <el-table border stripe class="table-width" @row-click="clickRow" ref="rolesTable" :data="rolesData"
                  @selection-change="handleRolesSelectionChange">
            <el-table-column type="selection" min-width="10%">
            </el-table-column>
            <el-table-column prop="name" label="名称" min-width="40%">
            </el-table-column>
            <el-table-column prop="description" label="描述" min-width="40%" show-overflow-tooltip>
            </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="confirm()">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    defaultSelected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      rolesData: [],
      multipleRolesSelection: [],
      showDialog: false
    }
  },
  methods: {
    getRolesList() {
      this.$fetch('/rest/role/list', res => (this.rolesData = res), {
        param: { order: 'asc' }
      })
    },
    clickRow(row) {
      this.$refs.rolesTable.toggleRowSelection(row)
    },
    handleRolesSelectionChange(val) {
      this.multipleRolesSelection = val
      console.log(this.multipleRolesSelection)
    },
    confirm() {
      this.showDialog = false
      this.$emit('selected-roles', this.multipleRolesSelection)
    },
    showSelectedRoles() {
      //解决异步延迟加载导致dom未渲染报错
      this.$nextTick(() => {
        this.$refs.rolesTable.clearSelection()
        this.rolesData
          .filter(role => this.defaultSelected.includes(role['id']))
          .forEach(row => this.$refs.rolesTable.toggleRowSelection(row), true)
      })
    }
  },
  watch: {
    isShow() {
      this.showDialog = true
    }
  },
  mounted() {
    this.getRolesList()
  }
}
</script>

<style scoped>
</style>
