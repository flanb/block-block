import Experience from '../Experience.js'
import Floor from 'components/Floor.js'
import Cube from 'components/Cube/Cube.js'
import Map from 'components/Map.js'
import Environment from 'components/Environment.js'

export default class Main {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.floor = new Floor()
			this.cube = new Cube()
			this.map = new Map()
			this.environment = new Environment()
		})
	}

	update() {
		if (this.cube) this.cube.update()
	}
}
