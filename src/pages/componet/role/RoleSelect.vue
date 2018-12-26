<template>
    <el-dialog
            width="30%"
            title="选择角色"
            :close-on-click-modal="false"
            :visible.sync="showDialog"
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
            <el-button type="primary" @click="showDialog = false">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import $ from '../../../libs/util'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
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
      $.get(this, '/rest/role/list', res => (this.rolesData = res), {
        param: { order: 'asc' }
      })
    },
    clickRow(row) {
      this.$refs.rolesTable.toggleRowSelection(row)
    },
    handleRolesSelectionChange(val) {
      this.multipleRolesSelection = val
      console.log(this.multipleRolesSelection)
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
