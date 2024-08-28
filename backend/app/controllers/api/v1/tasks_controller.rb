class Api::V1::TasksController < ActionController::API
  before_action :set_task, only: %i[show update destroy]
  # GET api/vi/tasks/
  def index
    @tasks = Task.search(params[:title])
    render json: { status: 'success', data: @tasks }
  end

  # GET api/vi/tasks/:id
  def show
    render json: { status: 'success', data: @task }
  end

  # Post api/vi/tasks
  def create
    @task = Task.new(task_params)
    if @task.save
      render json: { status: 'success', data: @task }
    else
      render json: { status: 'error', data: @task.errors }
    end
  end

  # Put api/vi/tasks/:id
  def update
    if @task.update(task_params)
      render json: { status: 'success', data: @task }
    else
      render json: { status: 'error', data: @task.errors }
    end
  end

  # Delete api/vi/tasks/:id
  def destroy
    @task.destroy
    render json: { status: 'success', data: @task }
  end

  private

  def task_params
    params.require(:task).permit(:title, :description)
  end

  def set_task
    @task = Task.find(params[:id])
  end
end
