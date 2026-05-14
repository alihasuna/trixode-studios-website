"use client"

import { useCallback, useEffect, useReducer, useRef } from "react"
import { initialState, type StepKey, type WorkflowState } from "./schema"

const STORAGE_KEY = "trixode-lab-workflow-v1"

type Action =
    | { type: "HYDRATE"; payload: { state: WorkflowState; stepIndex: number } }
    | { type: "SET_FIELD"; step: StepKey; field: string; value: string }
    | { type: "TOGGLE_CHECKBOX"; step: StepKey; field: string; value: string }
    | { type: "NEXT" }
    | { type: "BACK" }
    | { type: "GOTO"; stepIndex: number }
    | { type: "RESET" }

type ReducerState = {
    state: WorkflowState
    stepIndex: number
}

const initial: ReducerState = { state: initialState, stepIndex: 0 }

function reducer(s: ReducerState, action: Action): ReducerState {
    switch (action.type) {
        case "HYDRATE":
            return { state: action.payload.state, stepIndex: action.payload.stepIndex }
        case "SET_FIELD": {
            const stepState = s.state[action.step] as Record<string, unknown>
            return {
                ...s,
                state: {
                    ...s.state,
                    [action.step]: { ...stepState, [action.field]: action.value },
                },
            }
        }
        case "TOGGLE_CHECKBOX": {
            const stepState = s.state[action.step] as Record<string, unknown>
            const current = (stepState[action.field] as string[]) ?? []
            const next = current.includes(action.value)
                ? current.filter((v) => v !== action.value)
                : [...current, action.value]
            return {
                ...s,
                state: {
                    ...s.state,
                    [action.step]: { ...stepState, [action.field]: next },
                },
            }
        }
        case "NEXT":
            return { ...s, stepIndex: s.stepIndex + 1 }
        case "BACK":
            return { ...s, stepIndex: Math.max(0, s.stepIndex - 1) }
        case "GOTO":
            return { ...s, stepIndex: action.stepIndex }
        case "RESET":
            return initial
        default:
            return s
    }
}

export function useWorkflowState() {
    const [{ state, stepIndex }, dispatch] = useReducer(reducer, initial)
    const hydrated = useRef(false)

    useEffect(() => {
        if (hydrated.current) return
        hydrated.current = true
        if (typeof window === "undefined") return
        try {
            const raw = window.sessionStorage.getItem(STORAGE_KEY)
            if (!raw) return
            const parsed = JSON.parse(raw) as { state?: WorkflowState; stepIndex?: number }
            if (parsed.state) {
                dispatch({
                    type: "HYDRATE",
                    payload: {
                        state: { ...initialState, ...parsed.state },
                        stepIndex: typeof parsed.stepIndex === "number" ? parsed.stepIndex : 0,
                    },
                })
            }
        } catch {
            // ignore — corrupted state should reset
        }
    }, [])

    useEffect(() => {
        if (typeof window === "undefined") return
        if (!hydrated.current) return
        try {
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ state, stepIndex }))
        } catch {
            // ignore quota / private-mode errors
        }
    }, [state, stepIndex])

    const setField = useCallback((step: StepKey, field: string, value: string) => {
        dispatch({ type: "SET_FIELD", step, field, value })
    }, [])

    const toggleCheckbox = useCallback((step: StepKey, field: string, value: string) => {
        dispatch({ type: "TOGGLE_CHECKBOX", step, field, value })
    }, [])

    const next = useCallback(() => dispatch({ type: "NEXT" }), [])
    const back = useCallback(() => dispatch({ type: "BACK" }), [])
    const goto = useCallback((stepIndex: number) => dispatch({ type: "GOTO", stepIndex }), [])
    const reset = useCallback(() => {
        if (typeof window !== "undefined") {
            try {
                window.sessionStorage.removeItem(STORAGE_KEY)
            } catch {
                // ignore
            }
        }
        dispatch({ type: "RESET" })
    }, [])

    return { state, stepIndex, setField, toggleCheckbox, next, back, goto, reset }
}
