<template>
	<div>
		<b-container class="justify-content-center w-50">
			<b-form @submit="onSubmit">
				<h1>Sign Up</h1>
					<b-form-group label="Email:">
						<b-form-input :type="'text'"  placeholder="Email" v-model="email" class="input-box-width" :class="{ invalid: errors.has('email')}" v-validate.disable="'required|email'" name='email'>
						</b-form-input>
						<span v-show="errors.has('email')" class="span-show-message">{{ errors.first('email') }}</span>
					</b-form-group>

					<b-form-group label="Username:">
						<b-form-input :type="'text'"  placeholder="Username" v-model="username" class="input-box-width" :class="{ invalid: errors.has('username')}" 
						v-validate.disable="'required|alpha_num'" name='username' data-vv-as="username">
						</b-form-input>
						<span v-show="errors.has('username')" class="span-show-message">{{ errors.first('username') }}</span>
					</b-form-group>

					<b-form-group label="Password:">
						<b-form-input :type="'password'"  placeholder="Password" v-model="password" class="input-box-width" ref="password" :class="{ invalid: errors.has('password')}" 
						v-validate.disable="{required: true, min: 6}" name="password" data-vv-as="password">
						</b-form-input>
						<span v-show="errors.has('password')" class="span-show-message">{{ errors.first('password') }}</span>
					</b-form-group>

					<b-form-group label="Confirm Password:">
						<b-form-input :type="'password'"  placeholder="Retype Password" v-model="confirmPassword" class="input-box-width" :class="{ invalid: errors.has('password_confirmation')}" 
						name='password_confirmation' v-validate.disable="{required: true, confirmed:password, min: 6}" data-vv-as="confirm password">
						</b-form-input>
						<span v-show="errors.has('password_confirmation')" class="span-show-message">{{ errors.first('password_confirmation') }}</span>
					</b-form-group>
					<b-button type="submit">Submit</b-button>
				</b-form>
				<!-- <b-alert id="errorAlert" variant="danger" dismissible :show="hasRegErr" @dismissed="hasRegErr=false">{{ errorMessages }}</b-alert> -->
				<!-- <p>Has errors {{ hasRegErr }} </p> -->	
			</b-container>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	export default {
		data() {
			return {
				email: '',
				username: '',
				password: '',
				confirmPassword:''
			}
		},
		computed: {
			...mapGetters({
				userState: 'user',
				errorMessages: 'errorMsg',
				hasRegErr: 'hasError'
			})
		},
		methods: {
			onSubmit(e) {
				e.preventDefault()
				this.$validator.validateAll().then(result => {
					if(result) {
						//console.log("hell yeah good job")
						const formData = {
						email: this.email,
						username: this.username,
						password: this.password,
						confirmPassword: this.confirmPassword
						}

						
					this.$store.dispatch('signup', formData)
						.then(() => {
							this.$router.push('/profile')
						})
						.catch(error => {
							console.log(error) // eslint-disable-line
						})
					}
				})
			}
		}
	}
	

</script>

<style scoped>
	#errorAlert {
		margin-top: 10px;
	}

	.input-box-width {
    width: 55%;
  }

	.input-box-width.invalid {
    border: 2px solid red;
  }

	.span-show-message {
    color: #c4072d;
    font-weight: bold;
  }
</style>

