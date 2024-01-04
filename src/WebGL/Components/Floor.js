import Experience from '../Experience.js'
import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import addObjectDebug from 'utils/addObjectDebug.js'
import * as CANNON from 'cannon-es'

export default class Floor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.physicsWorld = this.experience.physicsWorld

		this.setGeometry()
		this.setMaterial()
		this.setMesh()
		this.setPhysics()
		if (this.debug.active) this.setDebug()
	}

	setGeometry() {
		this.geometry = new PlaneGeometry(10, 10)
	}

	setMaterial() {
		this.material = new MeshBasicMaterial()
	}

	setMesh() {
		this.mesh = new Mesh(this.geometry, this.material)
		this.mesh.rotation.x = -Math.PI * 0.5
		this.mesh.name = 'floor'
		this.scene.add(this.mesh)
	}

	setPhysics() {
		const { position, quaternion } = this.mesh
		const shape = new CANNON.Plane()
		const physicsBody = new CANNON.Body({
			mass: 0,
			shape,
			position: new CANNON.Vec3(position.x, position.y, position.z),
			quaternion: new CANNON.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w),
		})
		this.physicsWorld.addBody(physicsBody)
	}

	setDebug() {
		addObjectDebug(this.debug.ui, this.mesh)
	}
}
