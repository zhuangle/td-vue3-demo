<template>
  <div class="employee">
    <div class="header">
      <t-form
        ref="form"
        layout="inline"
        label-width="34px"
        :data="queryParams"
        @reset="resetQueryForm"
        @submit="getList(1)"
      >
        <t-form-item label="工号" name="employeeCode">
          <t-input
            v-model="queryParams.employeeCode"
            class="searchInput"
            placeholder="请输入工号"
            @enter="getList(1)"
          />
        </t-form-item>
        <t-form-item label="姓名" name="name">
          <t-input v-model="queryParams.name" class="searchInput" placeholder="请输入员工姓名" @enter="getList(1)" />
        </t-form-item>
        <t-form-item label="角色" name="roleId">
          <t-select
            v-model="queryParams.roleId"
            :options="roleList"
            placeholder="请选择角色"
            @change="getList(1)"
          ></t-select>
        </t-form-item>
        <t-form-item label="状态" name="state">
          <t-select
            v-model="queryParams.state"
            :options="stateTypeList"
            placeholder="请选择状态"
            @change="getList(1)"
          ></t-select>
        </t-form-item>
        <t-form-item>
          <t-space size="small">
            <t-button theme="success" variant="base" type="submit">搜索</t-button>
            <t-button theme="default" type="reset">重置</t-button>
            <t-button theme="primary" @click="handleUpdateEmployee">新增</t-button>
          </t-space>
        </t-form-item>
      </t-form>
    </div>
    <div class="table">
      <t-table
        row-key="index"
        :data="tableData"
        :pagination="pagination"
        :columns="columns"
        :hover="true"
        @change="onPageChange"
      >
        <template #gender="slotProps">
          <t-space>
            <span v-if="slotProps.row.gender === 1">男</span>
            <span v-if="slotProps.row.gender === 0">女</span>
          </t-space>
        </template>
        <template #roleId="slotProps">
          <t-space>
            <span v-if="slotProps.row.roleId === 1">管理员</span>
            <span v-else-if="slotProps.row.roleId === 2">人事经理</span>
            <span v-else-if="slotProps.row.roleId === 3">财务经理</span>
          </t-space>
        </template>
        <template #op="slotProps">
          <t-space>
            <t-link theme="danger" @click="handleDelEmployee(slotProps)"> 删除</t-link>
            <t-link theme="primary" @click="handleUpdateEmployee(slotProps)">编辑</t-link>
            <t-link theme="default" @click="handleResetEmployeePassword(slotProps)">重置密码</t-link>
          </t-space>
        </template>
      </t-table>
    </div>
    <div class="dialog">
      <t-dialog
        v-model:visible="dialogVisible"
        :header="updateFormData.id ? '修改员工' : '新增员工'"
        :confirm-on-enter="true"
        :on-confirm="onSubmitFormData"
        :on-cancel="closeDialog"
      >
        <div class="dialog__content">
          <t-form ref="updateform" :data="updateFormData" :colon="true">
            <t-form-item label="工号" name="employeeCode">
              <t-input
                v-model="updateFormData.employeeCode"
                :disabled="updateFormData.id ? true : false"
                placeholder="请输入工号"
              ></t-input>
            </t-form-item>
            <t-form-item label="姓名" name="name">
              <t-input v-model="updateFormData.name" placeholder="请输入姓名"></t-input>
            </t-form-item>
            <t-form-item label="手机" name="phone">
              <t-input v-model="updateFormData.phone" placeholder="请输入手机号"></t-input>
            </t-form-item>
            <t-form-item label="机构" name="roleId">
              <t-select v-model="updateFormData.dept" placeholder="请选择机构">
                <t-option v-for="item in deptList" :key="item.value" :label="item.label" :value="item.value" />
              </t-select>
            </t-form-item>
            <t-form-item label="角色" name="roleId">
              <t-select v-model="updateFormData.roleId" placeholder="请选择角色">
                <t-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value" />
              </t-select>
            </t-form-item>
            <t-form-item label="性别" name="gender">
              <t-radio-group v-model="updateFormData.gender">
                <t-radio :value="1">男</t-radio>
                <t-radio :value="0">女</t-radio>
              </t-radio-group>
            </t-form-item>
            <t-form-item label="状态" name="state">
              <t-radio-group v-model="updateFormData.state">
                <t-radio :value="1">在职</t-radio>
                <t-radio :value="0">离职</t-radio>
              </t-radio-group>
            </t-form-item>
          </t-form>
        </div>
      </t-dialog>
      <t-dialog
        v-model:visible="delConfirmVisible"
        header="确认删除选择的员工？"
        :body="confirmBody"
        :on-cancel="closeDelDialogFn"
        @confirm="onConfirmDelete"
      />
      <t-dialog
        v-model:visible="resetPasswordDialogVisible"
        header="确认要重置当前员工的密码吗？"
        :body="confirmBody"
        :on-cancel="closeResetpasswordDialogFn"
        @confirm="onConfirmResetPassword"
      />
    </div>
  </div>
</template>

<script setup lang="tsx">
import deepClone from 'lodash/cloneDeep';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
import {
  ButtonProps,
  DialogProps,
  FormProps,
  MessagePlugin,
  PrimaryTableCol,
  SelectProps,
  TableProps,
  TableRowData,
} from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { GetDepartmentList } from '@/api/department';
import { DelEmployee, GetEmployeeList, ResetEmployeePassword, UpdateEmployee } from '@/api/employee';
import { GetRoleList } from '@/api/role';

// state状态定义
const stateTypeList: SelectProps['options'] = [
  { label: '在职', value: 1 },
  { label: '离职', value: 0 },
];
interface StateListMap {
  [key: number]: {
    label: string;
    value: number;
    theme: ButtonProps['theme'];
    icon: JSX.Element;
  };
}
const stateListMap: StateListMap = {
  1: {
    label: '在职',
    value: 1,
    theme: 'success',
    icon: <CheckCircleFilledIcon />,
  },
  0: {
    label: '离职',
    value: 0,
    theme: 'danger',
    icon: <ErrorCircleFilledIcon />,
  },
};

// 表格配置
const columns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'serial-number', width: 80, title: '序号' },
  { colKey: 'employeeCode', title: '工号' },
  { colKey: 'name', title: '姓名' },
  { colKey: 'gender', title: '性别', width: 60 },
  { colKey: 'phone', title: '手机', width: 140 },
  {
    colKey: 'dept',
    title: '机构',
    cell: (h, { row }) => {
      console.log('h', h, row);
      return '-';
    },
  },
  { colKey: 'roleId', title: '角色' },
  {
    colKey: 'state',
    title: '状态',
    cell: (h, { row }) => {
      console.log('h', h);
      return (
        <t-tag shape="round" theme={stateListMap[row.state].theme} variant="light-outline">
          {stateListMap[row.state].icon}
          {stateListMap[row.state].label}
        </t-tag>
      );
    },
  },
  { colKey: 'createTime', title: '创建时间' },
  { colKey: 'op', title: '操作', width: 180 },
];
const tableData = ref<TableProps['data']>([]);
const pagination = ref<TableProps['pagination']>({
  current: 1,
  total: 0,
  pageSize: 10,
});

const onPageChange: TableProps['onPageChange'] = (pageInfo: any) => {
  pagination.value = pageInfo.pagination;
  getList();
  console.log('onPageChange', pageInfo.pagination);
};

// 请求列表
const queryParams: FormProps['data'] = ref({
  employeeCode: '',
  state: '',
  name: '',
  roleId: null,
  page: {},
});
// const onReset: FormProps['onReset'] = () => {
//   MessagePlugin.success('重置成功');
// };
const resetQueryForm: FormProps['onReset'] = () => {
  console.log('query', queryParams.value);
  MessagePlugin.success('重置成功');
  getList();
};
const getList = async (type?: number) => {
  if (type === 1) {
    pagination.value.current = 1;
  }
  const { current, pageSize } = pagination.value;
  queryParams.value.page = {
    current,
    pageSize,
  };
  interface GetListRes {
    code: number;
    message: string;
    data: object[];
    count: number;
    success: boolean;
  }
  const response: GetListRes = await GetEmployeeList(queryParams.value);
  tableData.value = response?.data ?? [];
  pagination.value.total = response?.count ?? 0;
};
onMounted(() => {
  getRoleList();
  getDepartmentList();
  getList();
});

const selesctEmployeeItem = ref([]);
let confirmBody: string = '';
const handleDelEmployee = (item: any) => {
  delConfirmVisible.value = true;
  const { id } = item.row;
  confirmBody = `【${item.row.employeeCode}】${item.row.name}`;
  selesctEmployeeItem.value.push(id);
};

const dialogVisible = ref(false);
const updateFormData = ref({
  id: null,
  employeeCode: '',
  name: '',
  gender: 1,
  dept: '',
  phone: '',
  roleId: null,
  state: 1,
  createTime: '',
});
const handleUpdateEmployee: ButtonProps['onClick'] = (item: any) => {
  if (item && item.row) {
    console.log('row', item.row);
    updateFormData.value = deepClone(item.row);
  }
  dialogVisible.value = true;
};
const onSubmitFormData = async () => {
  console.log('onSubmitFormData', onSubmitFormData);
  const res = await UpdateEmployee(updateFormData.value);
  console.log('res', res);
  if (res.code === 0) {
    if (updateFormData.value.id) {
      MessagePlugin.success('修改员工成功');
    } else {
      MessagePlugin.success('新增员工成功');
    }
    getList();
    dialogVisible.value = false;
    updateFormData.value = {
      id: null,
      employeeCode: '',
      name: '',
      gender: 1,
      dept: '',
      phone: '',
      roleId: null,
      state: 1,
      createTime: '',
    };
  }
};
const closeDialog: DialogProps['onConfirm'] = () => {
  dialogVisible.value = false;
  updateFormData.value = {
    id: null,
    employeeCode: '',
    name: '',
    gender: 1,
    dept: '',
    phone: '',
    roleId: null,
    state: 1,
    createTime: '',
  };
};
// 删除
const delConfirmVisible = ref(false);
const onConfirmDelete = async () => {
  console.log('onConfirmDelete');
  const res = await DelEmployee(selesctEmployeeItem.value);
  console.log('res', res);
  if (res.code === 0) {
    MessagePlugin.success('删除成功');
    getList();
    closeDelDialogFn();
  }
};
const closeDelDialogFn = () => {
  delConfirmVisible.value = false;
  selesctEmployeeItem.value = [];
};

// 重置密码
const resetItem = ref({
  id: null,
});
const resetPasswordDialogVisible = ref(false);
const handleResetEmployeePassword = async (item: any) => {
  console.log('resetEmployeePassword', item.row);
  resetItem.value = item.row;
  resetPasswordDialogVisible.value = true;
};
const onConfirmResetPassword = async () => {
  const { id } = resetItem.value;
  const res = await ResetEmployeePassword({ id });
  if (res.code === 0) {
    MessagePlugin.success('重置密码成功');
    resetPasswordDialogVisible.value = false;
    resetItem.value = { id: null };
  }
};
const closeResetpasswordDialogFn = () => {
  resetPasswordDialogVisible.value = false;
  resetItem.value = { id: null };
};

// 获取机构列表
let deptList = [
  { label: '人事部', value: '001' },
  { label: '财务部', value: '002' },
  { label: '运营部', value: '003' },
  { label: '后勤部', value: '004' },
];
const getDepartmentList = async () => {
  const res = await GetDepartmentList();
  if (res.code === 0) {
    deptList = res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  }
};

let roleList = [
  { label: '管理员', value: 1 },
  { label: '人事经理', value: 2 },
  { label: '财务经理', value: 3 },
];
const getRoleList = async () => {
  const res = await GetRoleList();
  if (res.code === 0) {
    roleList = res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: 10px;

  .searchInput {
    width: 140px;
  }
}
</style>
