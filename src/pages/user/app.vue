<template>
  <div class="page-container">
    <div class="border-bottom white-bg page-heading">
      <el-form :inline="true">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="登录账号：">
              <el-input
                placeholder="请输入登录名"
                v-model="loginName"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="alignRight">
            <el-form-item label="姓名：">
              <el-input
                placeholder="请输入用户姓名"
                v-model="userName"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary">查询</el-button>
            <el-button type="primary" @click="showUserAddModal()">
              新增
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-container-p75">
      <el-table
        :data="userData"
        border
        stripe
        :highlight-current-row="true"
        row-key="id"
        height="100%"
        class="table-width"
      >
        <el-table-column fixed prop="loginName" label="登录名" min-width="15%">
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="15%">
        </el-table-column>
        <el-table-column label="部门" min-width="25%">
          <template slot-scope="scope">{{
            scope.row.organizations
              .map(organization => organization.name)
              .join(',')
          }}</template>
        </el-table-column>
        <el-table-column label="角色" min-width="25%">
          <template slot-scope="scope">{{
            scope.row.roles.map(role => role.name).join(',')
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="20%">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">
              修改
            </el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="setPageSize"
      @current-change="setCurrentPage"
      :current-page="1"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="page-pull-right"
    >
    </el-pagination>
    <el-dialog
      title="新增用户"
      width="50%"
      top="20px"
      :visible.sync="addModalShow"
      :close-on-click-modal="false"
    >
      <div class="modal-height">
        <el-form :rules="userRules" :model="addForm" ref="addForm">
          <el-form-item label="登录名：" prop="loginName">
            <el-input
              placeholder="请输入登录名"
              v-model="addForm.loginName"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="passwd">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="addForm.passwd"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码：" prop="userConfirmedPassword">
            <el-input
              type="password"
              placeholder="请输入确认密码"
              v-model="addForm.userConfirmedPassword"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="姓名：" prop="name">
            <el-input
              placeholder="请输入用户姓名"
              v-model="addForm.name"
              clearable
            >
            </el-input>
          </el-form-item>

          <el-form-item label="部门：">
            <el-input
              placeholder="请选择部门"
              v-model="addForm.userDept"
              :readonly="true"
            >
              <template slot="append">
                <el-button size="small">选择</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="角色：">
            <el-input
              placeholder="请选择角色"
              v-model="addForm.userRoles"
              :readonly="true"
            >
              <template slot="append">
                <el-button
                  size="small"
                  @click="roleSelectModalShow = !roleSelectModalShow"
                >
                  选择
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModalShow = false">取 消</el-button>

        <el-button type="primary" @click="submitAddForm('addForm')">
          保存
        </el-button>
      </div>
    </el-dialog>
    <RoleSelect
      :is-show="roleSelectModalShow"
      :default-selected="selectedRoles.map(role => role['id'])"
      @selected-roles="onSelectedRoles"
    >
    </RoleSelect>
  </div>
</template>

<script>
import RoleSelect from '../componet/role/RoleSelect'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { RoleSelect },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addForm.userConfirmedPassword !== '') {
          this.$refs.addForm.validateField('userConfirmedPassword')
        }
        callback()
      }
    }
    const confirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.passwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // userData: [],
      loginName: '',
      userName: '',
      addModalShow: false,
      updateModalShow: false,
      updatePasswordModalShow: false,
      roleSelectModalShow: false,
      addForm: {
        loginName: '',
        passwd: '',
        userConfirmedPassword: '',
        name: '',
        userDept: '',
        userRoles: ''
      },
      userRules: {
        loginName: [
          { required: true, message: '请输入用户登录名', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
        passwd: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 8,
            max: 20,
            message: '密码长度应在 8 到 20 个字符之间',
            trigger: 'change'
          },
          { validator: validatePassword, trigger: 'change' }
        ],
        userConfirmedPassword: [
          { required: true, message: '请再次输入用户密码', trigger: 'blur' },
          { validator: confirmPassword, trigger: ['blur', 'change'] }
        ]
      },
      selectedRoles: []
    }
  },
  methods: {
    ...mapActions(['getUserList', 'setPageSize', 'setCurrentPage']),
    handleEdit(row) {
      console.log(row)
      this.changeSelectedRoles(row['roles'])
    },
    getTableData() {
      return this.userData.map(user => {
        let transUser = {}
        Object.assign(transUser, user)
        transUser.roles.Name = user.roles.map(role => role.name).join(',')
        transUser.organizations.name = user.organizations
          .map(organization => organization.name)
          .join(',')
        return transUser
      })
    },
    // async getUserList() {
    //   // $.get(this, '/rest/user/list', res => (this.userData = res['content']))
    //   this.userData = (await this.$fetch('/rest/user/list'))['content']
    // },
    onSelectedRoles(roles) {
      console.log('received selected roles')
      console.log(roles)
      this.changeSelectedRoles(roles)
    },
    changeSelectedRoles(roles) {
      this.selectedRoles = roles
      this.addForm.userRoles = this.selectedRoles
        .map(role => role.name)
        .join(',')
    },

    showUserAddModal() {
      this.addModalShow = true
      this.$nextTick(() => this.$refs.addForm.resetFields())
      this.selectedRoles = []
      this.addForm.userRoles = ''
    },
    submitAddForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.addForm['roleIds'] = this.selectedRoles.map(role => role['id'])
          this.$post('/rest/user/create', this.addForm, () => {
            this.$alert('保存成功')
            this.addModalShow = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {
    ...mapGetters(['userData', 'total'])
  },
  mounted() {
    console.log('mounted')
    this.getUserList()
  }
}
</script>

<style scoped>
.modal-height {
  max-height: 600px;
  overflow: auto;
}

.page-container {
  height: 100%;
}

.table-container-p75 {
  height: 85%;
}

.page-pull-right {
  float: right;
  margin-top: 5px;
}
</style>
