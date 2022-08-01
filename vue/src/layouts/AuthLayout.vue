<template>
    <div class="auth" ref="auth">
        <router-view :span="span" />
    </div>
</template>

<script>

    export default {
        name: "AuthLayout",
        data() {
            return {
                span: 8
            }
        },
        methods: {
            editSpan() {

                if (window.innerWidth > 1280) {
                    this.span = 8
                } else if (window.innerWidth <= 380) {
                    this.span = 22
                } else if (window.innerWidth <= 540) {
                    this.span = 20
                } else if (window.innerWidth <= 768) {
                    this.span = 14
                } else if (window.innerWidth <= 1280) {
                    this.span = 10
                }

                setTimeout(() => {
                    if (this.$refs.auth) {
                        if (this.$refs.auth.querySelector(".form")) {
                            this.$refs.auth.querySelector(".form").classList.add("show")
                        }
                    }
                }, 0)

            }
        },
        mounted() {
            this.editSpan()
        },
        created() {
            window.addEventListener("resize", this.editSpan)
        }
    }

</script>

<style lang="scss">

    .auth_loader {
        display: flex !important;
        left: 0 !important;
        transform: translateX(0) !important;
        margin: 15% auto !important;
    }

</style>
