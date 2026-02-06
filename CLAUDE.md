# Particle Simulation Project

## Overview
A particle simulation project built with HTML and JavaScript, simulating approximately 100 particles with physics-based interactions.

## Tech Stack
- HTML
- TypeScript (vanilla - Bun has native support)
- External libraries can be added as needed (ask before installing)

## Particle Specifications
Each particle has the following properties:
- **Mass**: Physical mass of the particle
- **Position**: X, Y coordinates in the simulation space
- **Velocity**: Movement vector (speed and direction)
- **Size**: Variable radius (adjustable to ensure collisions occur with ~100 particles)

## Physics Simulation
- **Collision detection and response**: Primary focus
- **No gravity, electromagnetic forces, or other forces** (for now)
- Elastic or inelastic collisions between particles
- Wall/boundary collisions

## Rendering
- **Canvas 2D context** (not WebGL)
- Particles drawn as circles with variable sizes
- Target: 60fps with ~100 particles

## Code Style
- **Modularity**: Keep code modular with no large god-objects
- **Separation of concerns**: Minimize the number of separate functions in the same file
- **ES6 syntax**: Use modern JavaScript features
- **Linting**: Standard ESLint rules

## Development Guidelines
- **Package manager**: Bun (faster, modern, built-in bundler)
- Keep the simulation performant with ~100 particles
- Ask before installing new libraries or dependencies
- Use vanilla JavaScript unless external libraries are needed for specific features
- Consider spatial partitioning (quadtree/grid) if collision detection becomes a bottleneck

## Verification & Testing
- Write unit tests where necessary (not comprehensive)
- Focus on testable logic: collision physics calculations, vector math, etc.
- Keep verification lightweight and non-time-consuming
- Use Bun's built-in test runner
