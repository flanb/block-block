import Experience from '../Experience.js'
import AnimationController from 'utils/AnimationController.js'
import addObjectDebug from 'utils/addObjectDebug.js'
import * as CANNON from 'cannon-es'
import { threeToCannon, ShapeType } from 'three-to-cannon'

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
		this.setPhysics()
		if (this.experience.debug.active) this.setDebug()
	}

	setModel() {
		this.model = this.resource.scene
		this.experience.scene.add(this.model)
	}

	setPhysics() {
		this.dynamicBodies = []
		this.model.traverse((child) => {
			if (child.isMesh) {
				const shapeResult = threeToCannon(child, {
					type: ShapeType.BOX,
				})

				const body = new CANNON.Body({
					mass: 0,
					position: new CANNON.Vec3(child.position.x, child.position.y, child.position.z),
					quaternion: new CANNON.Quaternion(
						child.quaternion.x,
						child.quaternion.y,
						child.quaternion.z,
						child.quaternion.w,
					),
				})
				body.addShape(shapeResult.shape, shapeResult.offset, shapeResult.orientation)
				body.name = 'platform'
				if (child.name.toLowerCase().includes('moving')) {
					body.name = 'moving'
					body.type = CANNON.Body.KINEMATIC
					this.dynamicBodies.push({ body, mesh: child.parent })
				}
				this.experience.physicsWorld.addBody(body)
			}
		})
	}

	update() {
		this.animation.update(this.experience.time.delta * 0.001)
		this.dynamicBodies.forEach(({ body, mesh }) => {
			if (!this.bodyPreviousPosition) body.position.copy(mesh.position)
			const velocityX = mesh.position.x - this.bodyPreviousPosition?.x
			this.bodyPreviousPosition = mesh.position.clone()
			if (velocityX) {
				body.velocity.x = velocityX * 20
			}
		})
	}

	setDebug() {
		const debugFolder = addObjectDebug(this.experience.debug.ui, this.model, { title: 'map' })
		this.animation.setDebug(debugFolder)
	}
}
