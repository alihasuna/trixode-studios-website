import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "my-v0-project"

// InputOTPSeparator is a bare <div role="separator"> holding a lucide Dot --
// it paints nothing on its own, so it is composed inside a real InputOTP here.
// The axis of this card is the SEGMENTATION the separator creates: 3-3, 2-2-2,
// 4-4, and one with the slots still empty.

export const Default = () => (
	<InputOTP maxLength={6} defaultValue="428913">
		<InputOTPGroup>
			<InputOTPSlot index={0} />
			<InputOTPSlot index={1} />
			<InputOTPSlot index={2} />
		</InputOTPGroup>
		<InputOTPSeparator />
		<InputOTPGroup>
			<InputOTPSlot index={3} />
			<InputOTPSlot index={4} />
			<InputOTPSlot index={5} />
		</InputOTPGroup>
	</InputOTP>
)

export const Segmented = () => (
	<InputOTP maxLength={6} defaultValue="731204">
		<InputOTPGroup>
			<InputOTPSlot index={0} />
			<InputOTPSlot index={1} />
		</InputOTPGroup>
		<InputOTPSeparator />
		<InputOTPGroup>
			<InputOTPSlot index={2} />
			<InputOTPSlot index={3} />
		</InputOTPGroup>
		<InputOTPSeparator />
		<InputOTPGroup>
			<InputOTPSlot index={4} />
			<InputOTPSlot index={5} />
		</InputOTPGroup>
	</InputOTP>
)

export const LicenseKey = () => (
	<InputOTP maxLength={8} defaultValue="TRX42026">
		<InputOTPGroup>
			<InputOTPSlot index={0} />
			<InputOTPSlot index={1} />
			<InputOTPSlot index={2} />
			<InputOTPSlot index={3} />
		</InputOTPGroup>
		<InputOTPSeparator />
		<InputOTPGroup>
			<InputOTPSlot index={4} />
			<InputOTPSlot index={5} />
			<InputOTPSlot index={6} />
			<InputOTPSlot index={7} />
		</InputOTPGroup>
	</InputOTP>
)

export const Empty = () => (
	<InputOTP maxLength={6}>
		<InputOTPGroup>
			<InputOTPSlot index={0} />
			<InputOTPSlot index={1} />
			<InputOTPSlot index={2} />
		</InputOTPGroup>
		<InputOTPSeparator />
		<InputOTPGroup>
			<InputOTPSlot index={3} />
			<InputOTPSlot index={4} />
			<InputOTPSlot index={5} />
		</InputOTPGroup>
	</InputOTP>
)
