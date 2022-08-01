<template>
    <el-row>
        <el-col :span="span" class="form">

            <h2>Sign in</h2>

            <el-form label-position="top" label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="Email:" prop="email">
                    <el-input v-model="ruleForm.email" type="email"></el-input>
                </el-form-item>

                <el-form-item label="Name:" prop="name">
                    <el-input v-model="ruleForm.name" type="text"></el-input>
                </el-form-item>

                <el-form-item label="Password:" prop="password">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>

                <el-form-item>
                    <div class="form_footer">
                        <el-button type="success" @click="submitForm('ruleForm')" class="w-btn">Sign up</el-button>
                        <el-button type="primary" class="w-btn">
                            <router-link to="/login"> Sign in </router-link>
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>

        </el-col>
    </el-row>
</template>

<script>

    import { mapActions } from "vuex"

    export default {
        name: "Registration",
        props: {
            span: [Number]
        },
        data() {
            return {
                ruleForm: {
                    name: "",
                    emeail: "",
                    password: ""
                },
                rules: {
                    email: [
                        {
                            required: true,
                            message: "Enter mail.",
                            trigger: "blur",
                        },
                        {
                            type: "email",
                            message: "Enter your currently email.",
                            trigger: "blur",
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: "Enter password.",
                            trigger: "blur",
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "Enter your name.",
                            trigger: "blur",
                        }
                    ]
                }
            }
        },
        mounted() {
            setTimeout(() => {
                document.querySelector(".auth .form").classList.add("show")
            }, 500)
        },
        methods: {
            ...mapActions(["register"]),
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {

                        const res = {
                            url: this.$w_api.SIGN_UP,
                            body: {
                                email: this.ruleForm.email,
                                password: this.ruleForm.password,
                                name: this.ruleForm.name,
                            }
                        }

                        const req = await this.register(res)

                        if (req) {
                            this.ruleForm.email = ""
                            this.ruleForm.password = ""
                            this.ruleForm.name = ""

                            setTimeout(() => {
                                this.$router.push("/")
                            }, 1000)
                        }

                    }
                })
            }
        }
    }

</script>
