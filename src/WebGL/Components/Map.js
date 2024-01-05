import Experience from '../Experience.js'
import { Group, Raycaster, Vector2, Vector3 } from 'three'

const blockPositions = [{ x: 0, y: 0, z: 0 }]

export default class Map {
	constructor() {
		this.experience = new Experience()
		this.blocks = new Group()
		this.experience.scene.add(this.blocks)
		this.blockModel = this.experience.resources.items.blockRoundedModel.scene.children[0]

		blockPositions.forEach((pos) => this.addBlock(pos))

		this.setRaycast()
	}

	addBlock(position) {
		const block = this.blockModel.clone()
		block.position.set(position.x, position.y, position.z)
		this.blocks.add(block)
	}

	setRaycast() {
		const raycaster = new Raycaster()
		const mouse = new Vector2()

		addEventListener('click', (event) => {
			mouse.x = (event.clientX / this.experience.sizes.width) * 2 - 1
			mouse.y = -(event.clientY / this.experience.sizes.height) * 2 + 1

			raycaster.setFromCamera(mouse, this.experience.camera.instance)

			const intersects = raycaster.intersectObject(this.blocks, true)
			if (intersects.length > 0) {
				const intersectedObjectPosition = intersects[0].object.parent.position.clone()
				const intersectedNormal = intersects[0].face.normal.ceil()
				this.addBlock(intersectedObjectPosition.add(intersectedNormal))
			}
		})
	}
}
