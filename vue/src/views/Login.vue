<template>
    <div v-if="getAppLoader" class="main main_loader">
        <!-- <Loader class="main_loader_ch" /> -->
    </div>
    <el-row v-else>
        <el-col :span="span" class="form">
            <h2>Sign in</h2>
            <el-form label-position="top" label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">

                <el-form-item label="Email:" prop="email">
                    <el-input v-model="ruleForm.email" type="email"></el-input>
                </el-form-item>

                <el-form-item label="Password:" prop="password">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>

                <el-form-item>
                    <div class="form_footer">
                        <el-button type="primary" @click="submitForm('ruleForm')" class="w-btn">Sign in</el-button>
                        <el-button type="success" class="w-btn">
                            <router-link to="/registration"> Sign up </router-link>
                        </el-button>
                    </div>
                </el-form-item>

            </el-form>
        </el-col>
    </el-row>
</template>

<script>

    import { mapMutations, mapActions, mapGetters } from "vuex"

    export default {
        props: {
            span: [Number],
        },
        data() {
            return {
                ruleForm: {
                    email: "",
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
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: "Enter password.",
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

            localStorage.removeItem("w_token")
            localStorage.removeItem("w_clone_token")

            if (this.$router.history.current.query.message) {
                const routerQuery = {key_massage: this.$router.history.current.query.message, message: ""}
                this.setMessage(routerQuery)
            }

        },
        methods: {
            ...mapActions(["fetchKey"]),
            ...mapMutations(["setMessage", "onAppLoader", "offAppLoader"]),
            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {

                        const res = {
                            url: this.$w_api.SIGN_IN,
                            body: {
                                email: this.ruleForm.email,
                                password: this.ruleForm.password
                            }
                        }

                        const req = await this.fetchKey(res)

                        if (req) {
                            this.ruleForm.email = ""
                            this.ruleForm.password = ""
                            this.$socket.io.opts.transportOptions.polling.extraHeaders.Authorization = localStorage.getItem("w_token")
                            this.$socket.connect()
                            window.location.href = '/'
                        } else {
                            setTimeout(() => {
                                document.querySelector(".auth .form").classList.add("show")
                            }, 10)
                            this.offAppLoader()
                        }

                    }
                })
            }
        },
        computed: {
            ...mapGetters(["getAppLoader"])
        }
    }
</script>
