# Android 开发 Skill

## 技能描述

此技能用于指导 Android 应用程序的开发，涵盖从基础设置到高级功能实现的完整开发流程。包括 Android 架构组件、Jetpack 库、UI 开发、数据持久化、网络请求等核心功能。

## 适用场景

- **新建 Android 项目**: 从零开始创建 Android 应用
- **功能开发**: 添加登录、数据展示、列表、网络请求等功能
- **架构优化**: 使用 MVVM、Clean Architecture 等架构模式
- **Jetpack 组件集成**: 使用 ViewModel、LiveData、Room、Navigation 等
- **UI/UX 实现**: Material Design、动画、自定义视图
- **性能优化**: 内存优化、布局优化、网络优化
- **调试与测试**: 单元测试、UI 测试、性能分析

## 技术栈

### 核心框架
- **Kotlin**: 首选编程语言
- **Java**: 兼容支持
- **Gradle**: 构建工具
- **Android Studio**: 官方 IDE

### Jetpack 组件
- **ViewModel**: 管理UI相关数据
- **LiveData**: 响应式数据观察
- **Room**: 数据库ORM
- **Navigation**: 导航组件
- **DataBinding/ViewBinding**: 视图绑定
- **WorkManager**: 后台任务管理
- **Paging 3**: 分页加载
- **Compose**: 现代声明式UI（可选）

### 网络与数据
- **Retrofit**: HTTP客户端
- **OkHttp**: 网络请求库
- **Gson/Moshi**: JSON解析
- **Coroutines/Flow**: 异步编程

### UI/UX
- **Material Design Components**: UI组件库
- **Coil/Glide**: 图片加载
- **Lottie**: 动画

### 测试
- **JUnit**: 单元测试
- **Espresso**: UI测试
- **Mockito**: 模拟框架
- **Robolectric**: Android单元测试

## 项目结构规范

```
app/
├── src/
│   ├── main/
│   │   ├── java/com/example/app/
│   │   │   ├── ui/                    # UI层
│   │   │   │   ├── main/
│   │   │   │   │   ├── MainActivity.kt
│   │   │   │   │   └── MainViewModel.kt
│   │   │   │   ├── auth/
│   │   │   │   │   ├── LoginActivity.kt
│   │   │   │   │   └── AuthViewModel.kt
│   │   │   │   └── adapter/           # 适配器
│   │   │   ├── data/                  # 数据层
│   │   │   │   ├── remote/            # 网络请求
│   │   │   │   ├── local/             # 本地数据
│   │   │   │   │   ├── entity/
│   │   │   │   │   └── dao/
│   │   │   │   └── repository/       # 仓库
│   │   │   ├── domain/                # 领域层
│   │   │   │   ├── model/
│   │   │   │   ├── usecase/
│   │   │   │   └── repository/
│   │   │   ├── core/                  # 核心组件
│   │   │   │   ├── utils/
│   │   │   │   ├── extension/
│   │   │   │   └── base/
│   │   │   └── Application.kt
│   │   ├── res/
│   │   │   ├── layout/
│   │   │   ├── values/
│   │   │   ├── drawable/
│   │   │   └── mipmap/
│   │   └── AndroidManifest.xml
│   ├── test/                          # 单元测试
│   └── androidTest/                   # UI测试
└── build.gradle
```

## 开发工作流程

### 1. 项目初始化

#### 创建新项目
```bash
# 使用 Android Studio
# File -> New -> New Project
# 选择: Empty Activity 或 Empty Compose Activity
# 配置:
# - Name: MyApp
# - Package name: com.example.myapp
# - Language: Kotlin
# - Minimum SDK: API 24 (Android 7.0)
```

#### 配置 build.gradle (Module)

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("kotlin-kapt")
    id("dagger.hilt.android.plugin")
}

android {
    namespace = "com.example.myapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
        
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    
    buildFeatures {
        viewBinding = true
        dataBinding = true
    }
    
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    // 核心库
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    
    // Jetpack
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0")
    implementation("androidx.lifecycle:lifecycle-livedata-ktx:2.7.0")
    implementation("androidx.navigation:navigation-fragment-ktx:2.7.6")
    implementation("androidx.navigation:navigation-ui-ktx:2.7.6")
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    kapt("androidx.room:room-compiler:2.6.1")
    implementation("androidx.work:work-runtime-ktx:2.9.0")
    implementation("androidx.paging:paging-runtime:3.2.1")
    
    // 网络请求
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")
    
    // 依赖注入
    implementation("com.google.dagger:hilt-android:2.48.1")
    kapt("com.google.dagger:hilt-android-compiler:2.48.1")
    
    // 图片加载
    implementation("io.coil-kt:coil:2.5.0")
    
    // 协程
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    
    // 测试
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}
```

### 2. MVVM 架构实现

#### ViewModel 基类

```kotlin
// core/base/BaseViewModel.kt
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

abstract class BaseViewModel : ViewModel() {
    
    protected fun <T> StateFlow<T>.asUiState() = asStateFlow()
    
    protected fun <T> SharedFlow<T>.asUiEvent() = asSharedFlow()
    
    protected fun viewModelScopeLaunch(
        block: suspend () -> Unit
    ) {
        viewModelScope.launch {
            try {
                block()
            } catch (e: Exception) {
                handleError(e)
            }
        }
    }
    
    open fun handleError(error: Exception) {
        error.printStackTrace()
    }
}
```

#### 具体示例: AuthViewModel

```kotlin
// ui/auth/AuthViewModel.kt
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : BaseViewModel() {
    
    private val _uiState = MutableStateFlow(AuthUiState())
    val uiState: StateFlow<AuthUiState> = _uiState
    
    private val _uiEvent = MutableSharedFlow<AuthUiEvent>()
    val uiEvent = _uiEvent.asSharedFlow()
    
    fun login(username: String, password: String) {
        viewModelScopeLaunch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            
            val result = authRepository.login(username, password)
            result.fold(
                onSuccess = { user ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        isLoggedIn = true,
                        user = user
                    )
                    _uiEvent.emit(AuthUiEvent.NavigateToHome)
                },
                onFailure = { error ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = error.message ?: "登录失败"
                    )
                }
            )
        }
    }
    
    fun register(username: String, password: String, email: String) {
        viewModelScopeLaunch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            
            val result = authRepository.register(username, password, email)
            result.fold(
                onSuccess = { user ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        isLoggedIn = true,
                        user = user
                    )
                    _uiEvent.emit(AuthUiEvent.NavigateToHome)
                },
                onFailure = { error ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = error.message ?: "注册失败"
                    )
                }
            )
        }
    }
    
    fun logout() {
        viewModelScopeLaunch {
            authRepository.logout()
            _uiState.value = AuthUiState()
            _uiEvent.emit(AuthUiEvent.NavigateToLogin)
        }
    }
    
    data class AuthUiState(
        val isLoading: Boolean = false,
        val isLoggedIn: Boolean = false,
        val user: User? = null,
        val error: String? = null
    )
    
    sealed class AuthUiEvent {
        object NavigateToHome : AuthUiEvent()
        object NavigateToLogin : AuthUiEvent()
    }
}
```

### 3. Repository 实现

#### Repository 接口

```kotlin
// domain/repository/AuthRepository.kt
import kotlinx.coroutines.flow.Flow

interface AuthRepository {
    suspend fun login(username: String, password: String): Result<User>
    suspend fun register(username: String, password: String, email: String): Result<User>
    suspend fun logout()
    fun getCurrentUser(): Flow<User?>
}
```

#### Repository 实现

```kotlin
// data/repository/AuthRepositoryImpl.kt
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthRepositoryImpl @Inject constructor(
    private val authRemoteDataSource: AuthRemoteDataSource,
    private val authLocalDataSource: AuthLocalDataSource
) : AuthRepository {
    
    override suspend fun login(username: String, password: String): Result<User> {
        return try {
            val response = authRemoteDataSource.login(username, password)
            authLocalDataSource.saveToken(response.token)
            Result.success(response.user)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    override suspend fun register(username: String, password: String, email: String): Result<User> {
        return try {
            val response = authRemoteDataSource.register(username, password, email)
            authLocalDataSource.saveToken(response.token)
            Result.success(response.user)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    override suspend fun logout() {
        authLocalDataSource.clearToken()
    }
    
    override fun getCurrentUser(): Flow<User?> {
        return authLocalDataSource.getCurrentUser()
    }
}
```

### 4. 网络请求层 (Retrofit)

#### API Service

```kotlin
// data/remote/AuthService.kt
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("api/auth/login")
    suspend fun login(@Body request: LoginRequest): AuthResponse
    
    @POST("api/auth/register")
    suspend fun register(@Body request: RegisterRequest): AuthResponse
}

data class LoginRequest(
    val username: String,
    val password: String
)

data class RegisterRequest(
    val username: String,
    val password: String,
    val email: String
)

data class AuthResponse(
    val token: String,
    val user: User
)
```

#### Retrofit 配置

```kotlin
// data/remote/RemoteDataSource.kt
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class RemoteDataSource @Inject constructor() {
    
    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }
    
    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .addInterceptor { chain ->
            val request = chain.request().newBuilder()
                .header("Content-Type", "application/json")
                .build()
            chain.proceed(request)
        }
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()
    
    private val gson = GsonBuilder()
        .setLenient()
        .create()
    
    fun <T> createApi(service: Class<T>, baseUrl: String): T {
        return Retrofit.Builder()
            .baseUrl(baseUrl)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
            .create(service)
    }
}
```

### 5. 本地数据层 (Room)

#### Entity

```kotlin
// data/local/entity/UserEntity.kt
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey
    val id: String,
    val username: String,
    val email: String,
    val avatar: String? = null,
    val createdAt: Long = System.currentTimeMillis()
)
```

#### DAO

```kotlin
// data/local/dao/UserDao.kt
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: UserEntity)
    
    @Query("SELECT * FROM users WHERE id = :userId")
    suspend fun getUserById(userId: String): UserEntity?
    
    @Query("SELECT * FROM users WHERE id = :userId")
    fun getUserByIdFlow(userId: String): Flow<UserEntity?>
    
    @Query("DELETE FROM users")
    suspend fun clearAllUsers()
}
```

#### Database

```kotlin
// data/local/AppDatabase.kt
import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [UserEntity::class],
    version = 1,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}
```

### 6. UI 层实现

#### Activity

```kotlin
// ui/main/MainActivity.kt
import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import com.example.myapp.R
import com.example.myapp.databinding.ActivityMainBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityMainBinding
    private val viewModel: MainViewModel by viewModels()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        binding.lifecycleOwner = this
        binding.viewModel = viewModel
        
        setupObservers()
        setupNavigation()
    }
    
    private fun setupObservers() {
        viewModel.uiState.observe(this) { state ->
            // Handle UI state changes
        }
        
        viewModel.uiEvent.observe(this) { event ->
            when (event) {
                is MainUiEvent.NavigateToDetail -> {
                    // Navigate to detail
                }
            }
        }
    }
    
    private fun setupNavigation() {
        // Setup navigation logic
    }
}
```

#### Adapter (列表)

```kotlin
// ui/adapter/UserAdapter.kt
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.myapp.databinding.ItemUserBinding

class UserAdapter(
    private val onItemClick: (User) -> Unit
) : ListAdapter<User, UserAdapter.UserViewHolder>(DiffCallback()) {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val binding = ItemUserBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return UserViewHolder(binding, onItemClick)
    }
    
    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
    
    class UserViewHolder(
        private val binding: ItemUserBinding,
        private val onItemClick: (User) -> Unit
    ) : RecyclerView.ViewHolder(binding.root) {
        
        fun bind(user: User) {
            binding.user = user
            binding.root.setOnClickListener { onItemClick(user) }
            binding.executePendingBindings()
        }
    }
    
    class DiffCallback : DiffUtil.ItemCallback<User>() {
        override fun areItemsTheSame(oldItem: User, newItem: User): Boolean {
            return oldItem.id == newItem.id
        }
        
        override fun areContentsTheSame(oldItem: User, newItem: User): Boolean {
            return oldItem == newItem
        }
    }
}
```

### 7. 依赖注入 (Hilt)

#### Application 类

```kotlin
// Application.kt
import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class MyApp : Application()
```

#### AppModule

```kotlin
// core/di/AppModule.kt
import android.content.Context
import androidx.room.Room
import com.example.myapp.data.local.AppDatabase
import com.example.myapp.data.local.dao.UserDao
import com.example.myapp.data.remote.AuthService
import com.example.myapp.data.remote.RemoteDataSource
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    
    @Provides
    @Singleton
    fun provideAppDatabase(@ApplicationContext context: Context): AppDatabase {
        return Room.databaseBuilder(
            context,
            AppDatabase::class.java,
            "app_database"
        ).build()
    }
    
    @Provides
    fun provideUserDao(database: AppDatabase): UserDao {
        return database.userDao()
    }
    
    @Provides
    @Singleton
    fun provideRemoteDataSource(): RemoteDataSource {
        return RemoteDataSource()
    }
    
    @Provides
    @Singleton
    fun provideAuthService(
        remoteDataSource: RemoteDataSource
    ): AuthService {
        return remoteDataSource.createApi(
            AuthService::class.java,
            "https://api.example.com/"
        )
    }
}
```

### 8. 测试

#### 单元测试 (ViewModel)

```kotlin
// ui/auth/AuthViewModelTest.kt
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.*
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.mockito.Mock
import org.mockito.MockitoAnnotations

@ExperimentalCoroutinesApi
class AuthViewModelTest {
    
    @Mock
    private lateinit var authRepository: AuthRepository
    
    private lateinit var viewModel: AuthViewModel
    
    private val testDispatcher = UnconfinedTestDispatcher()
    
    @Before
    fun setup() {
        MockitoAnnotations.openMocks(this)
        Dispatchers.setMain(testDispatcher)
        viewModel = AuthViewModel(authRepository)
    }
    
    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }
    
    @Test
    fun `login should update ui state with success`() = runTest {
        // Given
        val user = User(id = "1", username = "test", email = "test@example.com")
        whenever(authRepository.login("test", "password")).thenReturn(Result.success(user))
        
        // When
        viewModel.login("test", "password")
        
        // Then
        assertEquals(true, viewModel.uiState.value.isLoggedIn)
        assertEquals(user, viewModel.uiState.value.user)
    }
    
    @Test
    fun `login should update ui state with error`() = runTest {
        // Given
        val error = Exception("Login failed")
        whenever(authRepository.login("test", "wrong")).thenReturn(Result.failure(error))
        
        // When
        viewModel.login("test", "wrong")
        
        // Then
        assertEquals("Login failed", viewModel.uiState.value.error)
        assertFalse(viewModel.uiState.value.isLoggedIn)
    }
}
```

#### UI 测试 (Espresso)

```kotlin
// ui/auth/LoginActivityTest.kt
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import org.junit.Rule
import org.junit.Test

class LoginActivityTest {
    
    @get:Rule
    val composeTestRule = createComposeRule()
    
    @Test
    fun login_success_navigatesToHome() {
        composeTestRule.setContent {
            LoginScreen(
                uiState = AuthViewModel.AuthUiState(isLoggedIn = true),
                onLoginClick = { _, _ -> }
            )
        }
        
        composeTestRule.onNodeWithText("欢迎回来").assertIsDisplayed()
    }
    
    @Test
    fun login_button_displays_when_not_logged_in() {
        composeTestRule.setContent {
            LoginScreen(
                uiState = AuthViewModel.AuthUiState(isLoggedIn = false),
                onLoginClick = { _, _ -> }
            )
        }
        
        composeTestRule.onNodeWithText("登录").assertIsDisplayed()
    }
}
```

### 9. 常用工具类

#### SharedPreferences Helper

```kotlin
// core/utils/PreferenceHelper.kt
import android.content.Context
import android.content.SharedPreferences
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class PreferenceHelper @Inject constructor(
    @ApplicationContext context: Context
) {
    private val prefs: SharedPreferences = context.getSharedPreferences("AppPrefs", Context.MODE_PRIVATE)
    
    fun saveToken(token: String) {
        prefs.edit().putString("token", token).apply()
    }
    
    fun getToken(): String? {
        return prefs.getString("token", null)
    }
    
    fun clearToken() {
        prefs.edit().remove("token").apply()
    }
    
    fun saveUserId(userId: String) {
        prefs.edit().putString("userId", userId).apply()
    }
    
    fun getUserId(): String? {
        return prefs.getString("userId", null)
    }
}
```

#### Extension Functions

```kotlin
// core/extension/ViewExtensions.kt
import android.view.View
import androidx.fragment.app.Fragment
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

fun <T> Fragment.collectFlow(flow: Flow<T>, collect: (T) -> Unit) {
    viewLifecycleOwner.lifecycleScope.launch {
        viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
            flow.collect(collect)
        }
    }
}

fun View.visible() {
    visibility = View.VISIBLE
}

fun View.gone() {
    visibility = View.GONE
}

fun View.invisible() {
    visibility = View.INVISIBLE
}
```

### 10. 布局示例

#### Login Layout (XML)

```xml
<!-- res/layout/activity_login.xml -->
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">
    
    <data>
        <variable
            name="viewModel"
            type="com.example.myapp.ui.auth.AuthViewModel" />
    </data>
    
    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="24dp"
        tools:context=".ui.auth.LoginActivity">
        
        <TextView
            android:id="@+id/tvTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/welcome_back"
            android:textSize="28sp"
            android:textStyle="bold"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
        
        <com.google.android.material.textfield.TextInputLayout
            android:id="@+id/tilUsername"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="48dp"
            android:hint="@string/username"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/tvTitle">
            
            <com.google.android.material.textfield.TextInputEditText
                android:id="@+id/etUsername"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:inputType="text"
                android:text="@={viewModel.username}" />
        </com.google.android.material.textfield.TextInputLayout>
        
        <com.google.android.material.textfield.TextInputLayout
            android:id="@+id/tilPassword"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:hint="@string/password"
            app:endIconMode="password_toggle"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/tilUsername">
            
            <com.google.android.material.textfield.TextInputEditText
                android:id="@+id/etPassword"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:inputType="textPassword"
                android:text="@={viewModel.password}" />
        </com.google.android.material.textfield.TextInputLayout>
        
        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnLogin"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:enabled="@{viewModel.uiState.isLoading == false}"
            android:onClick="@{() -> viewModel.login()}"
            android:text="@string/login"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/tilPassword" />
        
        <ProgressBar
            android:id="@+id/progressBar"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:visibility="@{viewModel.uiState.isLoading ? View.VISIBLE : View.GONE}"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
        
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

### 11. Jetpack Compose 示例 (可选)

#### Login Screen (Compose)

```kotlin
// ui/auth/LoginScreen.kt
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun LoginScreen(
    uiState: AuthViewModel.AuthUiState,
    onLoginClick: (String, String) -> Unit
) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    
    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text(
                text = "欢迎回来",
                style = MaterialTheme.typography.headlineMedium
            )
            
            OutlinedTextField(
                value = username,
                onValueChange = { username = it },
                label = { Text("用户名") },
                modifier = Modifier.fillMaxWidth()
            )
            
            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                label = { Text("密码") },
                modifier = Modifier.fillMaxWidth()
            )
            
            Button(
                onClick = { onLoginClick(username, password) },
                enabled = !uiState.isLoading,
                modifier = Modifier.fillMaxWidth()
            ) {
                if (uiState.isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(20.dp),
                        color = MaterialTheme.colorScheme.onPrimary
                    )
                } else {
                    Text("登录")
                }
            }
            
            uiState.error?.let { error ->
                Text(
                    text = error,
                    color = MaterialTheme.colorScheme.error
                )
            }
        }
    }
}
```

## 最佳实践

### 1. 代码规范
- 使用 Kotlin 优于 Java
- 遵循 Android 官方代码风格指南
- 使用协程处理异步操作
- 使用 Flow 处理数据流
- 避免在 Activity/Fragment 中直接使用业务逻辑

### 2. 性能优化
- 使用 ViewBinding 替代 findViewById
- 使用 Glide/Coil 加载图片
- 使用 DiffUtil 优化 RecyclerView
- 使用 Paging 3 处理分页数据
- 避免 Memory Leaks（注意 Context 引用）

### 3. 安全性
- 敏感数据加密存储
- 使用 HTTPS 网络请求
- 证书绑定 (Certificate Pinning)
- 代码混淆 (ProGuard/R8)
- 防止反编译

### 4. 可维护性
- 模块化设计
- 使用依赖注入
- 编写单元测试和UI测试
- 清晰的命名规范
- 充分的代码注释

### 5. 用户体验
- Material Design 设计规范
- 流畅的动画效果
- 响应式布局适配不同屏幕
- 合理的加载状态提示
- 友好的错误提示

## 常见问题解决

### 问题 1: Gradle 构建慢
**解决方案:**
- 启用 Gradle Daemon
- 使用离线模式
- 优化 gradle.properties 配置

```properties
# gradle.properties
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
org.gradle.parallel=true
org.gradle.daemon=true
org.gradle.caching=true
android.useAndroidX=true
kotlin.code.style=official
```

### 问题 2: 网络请求失败
**解决方案:**
- 检查网络权限
- 验证 API 地址
- 添加日志拦截器查看请求详情
- 处理 SSL 证书问题

### 问题 3: 内存泄漏
**解决方案:**
- 使用 WeakReference
- 及时取消协程
- 避免 Activity/Context 静态引用
- 使用 LeakCanary 检测内存泄漏

### 问题 4: 构建时 APK 过大
**解决方案:**
- 启用 R8 混淆
- 移除未使用的资源
- 使用动态特性模块
- 优化图片资源

## 学习资源

### 官方文档
- [Android Developers](https://developer.android.com/)
- [Jetpack 文档](https://developer.android.com/jetpack)
- [Kotlin 官方文档](https://kotlinlang.org/docs/)

### 推荐课程
- Android Kotlin Fundamentals
- Advanced Android in Kotlin
- Jetpack Compose 基础

### 开源项目
- [Google Samples](https://github.com/android)
- [Android Architecture Blueprints](https://github.com/android/architecture-samples)

### 工具
- Android Studio
- LeakCanary
- Stetho
- Firebase

## 更新日志

### v1.0.0 (2025-01-01)
- 初始版本
- 包含 MVVM 架构实现
- Jetpack 组件集成
- 完整的代码示例

## 贡献指南

如果您发现问题或有改进建议，欢迎提交 Issue 或 Pull Request。

## 许可证

MIT License
