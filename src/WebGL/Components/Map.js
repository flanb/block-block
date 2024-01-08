import Experience from '../Experience.js'
import AnimationController from 'utils/AnimationController.js'
import addObjectDebug from 'utils/addObjectDebug.js'

export default class Map {
	constructor() {
		this.experience = new Experience()

		this.resource = this.experience.resources.items.mapModel

		this.setModel()

		this.animation = new AnimationController({
			model: this.resource.scene,
			animations: this.resource.animations,
		})
		this.animation.fadeAnimation(this.animation.animations[0].name, { loop: true, yoyo: true })
		this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene
		this.experience.scene.add(this.model)
	}
	update() {
		this.animation.update(this.experience.time.delta * 0.001)
	}
	setDebug() {
		const debugFolder = addObjectDebug(this.experience.debug.ui, this.model)
		this.animation.setDebug(debugFolder)
	}
}
