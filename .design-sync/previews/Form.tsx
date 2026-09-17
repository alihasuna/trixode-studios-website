import * as React from "react"
import { useForm } from "react-hook-form"
import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch,
	Textarea,
} from "my-v0-project"

// `Form` IS react-hook-form's FormProvider, so every story needs a real
// useForm() -- and FormLabel/FormControl/FormMessage must stay INSIDE the
// FormField render callback: the error repaint rides on Controller's
// re-render, so hoisting them out would leave setError invisible.

export const Default = () => {
	const form = useForm({
		defaultValues: {
			contact: "Ali Hasuna",
			email: "hello@trixode-studios.com",
			brief: "",
		},
	})

	return (
		<Form {...form}>
			<form className="w-80 space-y-6">
				<FormField
					control={form.control}
					name="contact"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Primary contact</FormLabel>
							<FormControl>
								<Input placeholder="Who runs point?" {...field} />
							</FormControl>
							<FormDescription>
								We loop this person in on every build review.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="brief"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project brief</FormLabel>
							<FormControl>
								<Textarea
									placeholder="What are we building, and what does done look like?"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Send brief</Button>
			</form>
		</Form>
	)
}

export const Validation = () => {
	const form = useForm({ defaultValues: { email: "hello@" } })

	React.useEffect(() => {
		form.setError("email", {
			type: "manual",
			message: "Enter a valid work email address.",
		})
	}, [form])

	return (
		<Form {...form}>
			<form className="w-80 space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Work email</FormLabel>
							<FormControl>
								<Input placeholder="you@company.com" {...field} />
							</FormControl>
							<FormDescription>
								Used for the SOW and the invoice.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Continue</Button>
			</form>
		</Form>
	)
}

export const ChoiceFields = () => {
	const form = useForm({
		defaultValues: { engagement: "discovery", digest: true },
	})

	return (
		<Form {...form}>
			<form className="w-80 space-y-6">
				<FormField
					control={form.control}
					name="engagement"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Engagement type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Choose a track" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="discovery">Discovery sprint</SelectItem>
									<SelectItem value="build">Full build</SelectItem>
									<SelectItem value="retainer">Monthly retainer</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								Sets the cadence and the invoicing tier.
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="digest"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center justify-between gap-4">
								<div className="flex flex-col gap-1">
									<FormLabel>Weekly build digest</FormLabel>
									<FormDescription>One email, Monday morning.</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</div>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
