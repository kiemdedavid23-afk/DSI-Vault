package com.dsivault.app

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * Activité principale DSI Vault.
 *
 * Étape actuelle (infrastructure + build debug) : aucun code Picture-in-Picture,
 * aucune intégration TrackPlayer/vidéo/PDF/OCR. Ces éléments seront ajoutés lors
 * des étapes correspondantes (décisions validées).
 */
class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "DSIVault"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}