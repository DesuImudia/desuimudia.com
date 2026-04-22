import { useEffect } from "react"

function enableRevealCSS() {
	document.documentElement.classList.add("js-reveal")
}

export function useScrollReveal() {
	useEffect(() => {
		enableRevealCSS()
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) entry.target.classList.add("visible")
				}
			},
			{ threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
		)
		const els = document.querySelectorAll(".reveal")
		for (const el of els) observer.observe(el)
		return () => observer.disconnect()
	}, [])
}

export function useWaterfallReveal(stagger = 110) {
	useEffect(() => {
		enableRevealCSS()

		type ContainerState = { children: HTMLElement[]; fired: boolean }
		const map = new Map<HTMLElement, ContainerState>()

		const containers = Array.from(
			document.querySelectorAll<HTMLElement>("[data-waterfall]")
		)

		for (const container of containers) {
			map.set(container, {
				children: Array.from(container.querySelectorAll<HTMLElement>(".reveal-item")),
				fired: false,
			})
		}

		const fire = (container: HTMLElement) => {
			const state = map.get(container)
			if (!state || state.fired) return
			state.fired = true
			state.children.forEach((child, i) => {
				setTimeout(() => child.classList.add("visible"), i * stagger)
			})
		}

		const check = () => {
			for (const [container, state] of map) {
				if (state.fired) continue
				const rect = container.getBoundingClientRect()
				if (rect.top < window.innerHeight * 0.92) fire(container)
			}
		}

		// Defer first check to after paint so getBoundingClientRect is accurate
		const raf = requestAnimationFrame(() => check())
		window.addEventListener("scroll", check, { passive: true })

		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener("scroll", check)
		}
	}, [stagger])
}
