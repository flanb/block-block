import Experience from '../Experience.js'
import Floor from 'components/Floor.js'
import Cube from 'components/Cube/Cube.js'
import Environment from 'components/Environment.js'
import Map from 'components/Map.js'

export default class Main {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			// this.floor = new Floor()
			// this.cube = new Cube()
			this.environment = new Environment()
			this.map = new Map()
		})
	}

	update() {
		if (this.cube) this.cube.update()
		if (this.map) this.map.update()
	}
}
