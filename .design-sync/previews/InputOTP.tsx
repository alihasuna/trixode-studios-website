import { InputOTP, InputOTPGroup, InputOTPSlot, Label } from "my-v0-project"

// InputOTPSlot reads its char from OTPInputContext, so it is only real inside
// InputOTP. `defaultValue` drives the uncontrolled render (input-otp 1.4).

export const Default = () => (
	<InputOTP maxLength={6}>
		<InputOTPGroup>
			<InputOTPSlot index={0} />
			<InputOTPSlot index={1} />
			<InputOTPSlot index={2} />
			<InputOTPSlot index={3} />
			<InputOTPSlot index={4} />
			<InputOTPSlot index={5} />
		</InputOTPGroup>
	</InputOTP>
)

export const Filled = () => (
	<InputOTP maxLength={6} defaultValue="428913">
		<InputOTPGroup>
			<InputOTPSlot index={0} />
			<InputOTPSlot index={1} />
			<InputOTPSlot index={2} />
			<InputOTPSlot index={3} />
			<InputOTPSlot index={4} />
			<InputOTPSlot index={5} />
		</InputOTPGroup>
	</InputOTP>
)

export const Partial = () => (
	<InputOTP maxLength={6} defaultValue="428">
		<InputOTPGroup>
			<InputOTPSlot index={0} />
			<InputOTPSlot index={1} />
			<InputOTPSlot index={2} />
			<InputOTPSlot index={3} />
			<InputOTPSlot index={4} />
			<InputOTPSlot index={5} />
		</InputOTPGroup>
	</InputOTP>
)

export const Field = () => (
	<div className="space-y-2">
		<Label htmlFor="otp-field">Verification code</Label>
		<InputOTP id="otp-field" maxLength={6} defaultValue="731204">
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
		<p className="text-sm text-muted-foreground">
			Sent to hello@trixode-studios.com — expires in 10 minutes.
		</p>
	</div>
)

export const Disabled = () => (
	<InputOTP maxLength={6} defaultValue="428913" disabled>
		<InputOTPGroup>
			<InputOTPSlot index={0} />
			<InputOTPSlot index={1} />
			<InputOTPSlot index={2} />
			<InputOTPSlot index={3} />
			<InputOTPSlot index={4} />
			<InputOTPSlot index={5} />
		</InputOTPGroup>
	</InputOTP>
)
